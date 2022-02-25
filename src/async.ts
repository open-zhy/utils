import type { RetryOptions } from 'src/types'

export const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

const defaultRetryOptions = {
  retries: 5,
  interval: 0,
  backoffFactor: 1,
};

const onlyDefined = (values: Record<string, any>): Record<string, any> => Object.entries(values).reduce(
  (result: Record<string, any>, [key, value]) => {
    if (typeof value !== 'undefined') {
      return {
        ...result,
        [key]: value,
      };
    }
    return result;
  }, {}
);

export const retry = <T extends unknown>(
  fn: () => Promise<T>,
  o?: RetryOptions
) => new Promise((resolve, reject) => {
  const opts = {
    ...defaultRetryOptions,
    ...onlyDefined(o || {}),
  };

  fn()
    .then(resolve)
    .catch((e: Error) => {
      if (opts.retries === 1) {
        reject(e);
        return;
      }

      wait((opts.backoffFactor ** opts.retries) * (opts.interval || 1000)).then(
        () => {
          retry(fn, { ...opts, retries: opts.retries - 1 }).then(resolve).catch(reject);
        }
      );
    });
});

export const promiseAllStepN = <T extends unknown>(n: number, list: any[]) => {
  if (list.length === 0) {
    return Promise.resolve([]);
  }

  const tail = list.splice(n);
  const head = list;
  const resolved: any[] = [];
  let processed = 0;
  return new Promise<T[]>((resolve) => {
    head.forEach((x) => {
      const res: Promise<T> = x();
      resolved.push(res);
      res.then((y: T) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        runNext();
        return y;
      });
    });

    const runNext = () => {
      if (processed === tail.length) {
        resolve(Promise.all(resolved));
      } else {
        resolved.push(
          tail[processed]().then((x: T) => {
            runNext();
            return x;
          })
        );
        processed++;
      }
    };
  });
};

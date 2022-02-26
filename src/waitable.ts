import EventEmitter from 'events';

/**
 * Waiter class implementation
 */
export class Waiter<T> {
  protected em: EventEmitter

  constructor(em: EventEmitter) {
    this.em = em;
  }

  call(prom: Promise<T>) {
    prom
      .catch(
        (err: Error) => this.em.emit('error', err)
      )
      .finally(
        () => this.em.emit('done')
      );
  }

  catch(fn: (err: Error) => void) {
    return this.on('error', fn);
  }

  done(fn: () => void) {
    return this.on('done', fn);
  }

  emit(eventName: string, ...args: any): Waiter<T> {
    this.em.emit(eventName, ...args);

    return this;
  }

  on<Arg = void>(eventName: string, callback: (arg: Arg) => void): Waiter<T> {
    this.em.on(eventName, callback);

    return this;
  }
}

/**
 * Waitable class implementation
 * 
 * Example of usage:
 * ---------------------------------------------------------------------------------------------
 * getOwnerAssets(owner: string, offset = 0, limit = Infinity): Waitable<CollectionOf<T>> {
 *  return new Waitable((w: Waiter<CollectionOf<T>>) => this._ensure(async () => {
 *    const totalNum: number = await this.getOwnerAssetsCount(owner);
 *
 *    w.emit('count', totalNum);
 *
 *    const result = {
 *      total: totalNum,
 *      offset,
 *      limit,
 *    };
 *
 *    if (totalNum === 0) {
 *      w.emit('result', {
 *        ...result,
 *        items: [],
 *        isLast: true,
 *      });
 *
 *      return {
 *        ...result,
 *        isLast: true,
 *        items: [],
 *      };
 *    }
 *
 *    const assets = await promiseAllStepN<T>(
 *      10,
 *      new Array(totalNum)
 *        .fill(0)
 *        .map((_, index) => index)
 *        .slice(offset, offset + limit)
 *        .map((index: number) => async () => {
 *          // retrieve tokenId
 *          const tokenId: BigNumberish = await this.cRead.tokenOfOwnerByIndex(owner, index);
 *
 *          // get sell info
 *          const asset = await this.getAssetByTokenId(tokenId);
 *          w.emit('data', { ...asset, index });
 *
 *          return { ...asset, index };
 *        })
 *    );
 *
 *    w.emit('result', {
 *      ...result,
 *      items: assets,
 *      isLast: totalNum === offset + assets.length,
 *    });
 *
 *    return {
 *      ...result,
 *      items: assets,
 *      isLast: totalNum === offset + assets.length,
 *    };
 *  }));
 * }
 * ---------------------------------------------------------------------------------------------
 * 
 */
export class Waitable<T> {
  protected waiter: Waiter<T>

  protected prom: Promise<T>

  constructor(protected _p: (w: Waiter<T>) => Promise<T>) {
    this.waiter = new Waiter(new EventEmitter());
    this.prom = this._p(this.waiter);
    this.waiter.call(this.prom);
  }

  promise(swallowError?: boolean): Promise<T> {
    if (swallowError) {
      this.prom.catch(console.warn);
    }
    return this.prom;
  }

  wait(): Waiter<T> {
    return this.waiter;
  }
}

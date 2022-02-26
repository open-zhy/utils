export const defaultCliperFactory = (...CANVAS_SIZE: number[]) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any,
  clipX: number,
  clipY: number,
  clipWidth: number,
  clipHeight: number
): Promise<string> => {
  // const CANVAS_SIZE = 128;
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_SIZE[0];
  canvas.height = CANVAS_SIZE[1] || CANVAS_SIZE[0];
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    image,
    clipX,
    clipY,
    clipWidth,
    clipHeight,
    0,
    0,
    CANVAS_SIZE[0],
    CANVAS_SIZE[1] || CANVAS_SIZE[0]
  );

  return Promise.resolve(
    canvas.toDataURL()
  );
};

/**
 * Clip avatar to square
 * 
 * @param file 
 * @param sz 
 * @returns 
 */
export const clipAvatar = (file: File, sz: number) => new Promise<{data: string; image: HTMLImageElement}>(
  (resolve) => {
    const cliper = defaultCliperFactory(sz);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async function () {
      // @ts-ignore
      const w = this.width;
      // @ts-ignore
      const h = this.height;

      // as we need a square, we can take the min of w and h as anchor
      const size = Math.min(w, h);
      const x = (w - size) / 2;
      const y = (h - size) / 2;

      const data = await cliper(img, x, y, size, size);

      return resolve({ image: img, data });
    };
  }
);

/**
 * Clip cover image to a rectangle
 * 
 * @param file 
 * @param sz 
 * @returns 
 */
export const clipCover = (file: File, sz: number[]) => new Promise<{data: string; image: HTMLImageElement}>(
  (resolve) => {
    const r0 = sz[0] / (sz[1] || sz[0]);
    const cliper = defaultCliperFactory(...sz);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async function () {
      // @ts-ignore
      const w = this.width;
      // @ts-ignore
      const h = this.height;

      const r = w / h;

      let size: [number, number];
      let x: number;
      let y: number;
      if (r === r0) {
        x = 0;
        y = 0;
        size = [w, h];
      } else if (r < r0) {
        size = [w, Math.ceil(w / r0)];
        x = 0;
        y = (h - size[1]) / 2;
      } else {
        size = [Math.ceil(r0 * h), h];
        x = (w - size[0]) / 2;
        y = 0;
      }

      const data = await cliper(img, x, y, ...size);

      return resolve({ data, image: img });
    };
  }
);

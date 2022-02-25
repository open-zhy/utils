export const arrayIntersect = <T extends unknown>(
  arr1: T[],
  arr2: T[]
) => arr1.filter((a1: T) => arr2.includes(a1));

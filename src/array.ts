/**
 * Find intersections of 2 array
 *  
 * @param arr1 
 * @param arr2 
 * @returns Array of all values that share both arrays
 */
export const arrayIntersect = <T extends unknown>(
  arr1: T[],
  arr2: T[]
) => arr1.filter((a1: T) => arr2.includes(a1));

/**
 * Remove an item from array by its index
 * 
 * @param source 
 * @param index 
 * @returns 
 */
export const removeByIndex = <T>(source: Array<T>, index: number): Array<T> => {
  const temp: Array<T> = [...source];
  temp.splice(index, 1);

  return temp;
};

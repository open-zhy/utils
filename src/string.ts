/**
 * Create a random string that can be used as Id
 * 
 * @param factor 
 * @returns 
 */
export const generateId = (factor: number = 16): string => {
  const arr = new Uint8Array(factor);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
};

/**
 * Capitablize a string
 * 
 * @param text 
 * @returns 
 */
export const capitalize = (text: string): string => {
  if ((text || '').length === 0) {
    return '';
  }

  return text[0].toUpperCase() + text.substring(1);
};

/**
 * Truncate a string
 * 
 * @param str 
 * @param num 
 * @returns 
 */
export const truncate = (str: string, num: number = 100): string => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }

  // Return str truncated with '...' concatenated to the end of str.
  return `${str.slice(0, num)}...`;
};

/**
 * Simplified text parser
 * 
 * @param originalText 
 * @param config 
 * @returns 
 */
export const textParser = (originalText: string, config: any[] = []): { [key: string]: string } => {
  const result: { [key: string]: string } = {};

  let rest: string = originalText;
  config.forEach(({ key, search }: { key: string; search: string }) => {
    result[key] = rest.split(search).pop();
    rest = rest.replace(result[key], '').replace(search, '');
  });

  return result;
};
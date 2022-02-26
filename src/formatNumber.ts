import replace from 'lodash.replace';
import numeral from 'numeral';

/**
 * Format a number to currency
 * 
 * @param number 
 * @returns 
 */
export function fCurrency(number: number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

/**
 * Format a number to percent
 * 
 * @param number 
 * @returns 
 */
export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

/**
 * Enforce number formatting
 * 
 * @param number 
 * @returns 
 */
export function fNumber(number: number) {
  return numeral(number).format();
}

/**
 * Shorten a number
 * 
 * @param number 
 * @returns 
 */
export function fShortenNumber(number: number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

/**
 * Format number
 * 
 * @param number 
 * @returns 
 */
export function fData(number: number) {
  return numeral(number).format('0.0 b');
}

/**
 * Make user-friendly number like 1.3K, 3.6M
 * 
 * @param num 
 * @param digits 
 * @returns 
 */
export const nFormat = (num: number, digits = 0): string => {
  if (num <= 1) {
    return num.toFixed(digits);
  }

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((i) => num >= i.value);

  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};

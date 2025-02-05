/**
 * Adds commas to a given number for better readability.
 *
 * @param {number} x - The number to be formatted.
 * @returns {string} The formatted number with commas.
 */
export function numberWithCommas(x: number): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Truncates a given text to a specified maximum length, appending an ellipsis if necessary.
 *
 * @param {string | undefined} text - The text to truncate.
 * @param {number} maxLength - The maximum length of the returned string.
 * @returns {string}
 */
export const truncateText = (
  text: string | undefined,
  maxLength: number
): string => {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}..` : text;
};

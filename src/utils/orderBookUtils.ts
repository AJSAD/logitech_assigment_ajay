import numeral from "numeral";
import { OrderLevel } from "../containers";
import { Order } from "../slices";

/**
 * Formats a given number to four significant digits.
 * 
 * If the number is greater than or equal to 1000, it formats the number with a suffix 
 * ('K' for thousands, 'M' for millions, etc.) and rounds to three decimal places.
 * If the number is less than 1, it rounds the number to four decimal places.
 * Otherwise, it returns the number with four significant digits.
 * 
 * @param {number} value - The number to be formatted.
 * @returns {string} - The formatted number as a string.
 * 
 * @example
 * formatToFourDigits(0.0566)   // "0.0566"
 * formatToFourDigits(1.5671)   // "1.567"
 * formatToFourDigits(22.6733)  // "22.67"
 * formatToFourDigits(123.6123) // "123.6"
 * formatToFourDigits(1034)     // "1.034K"
 */
const formatToFourDigits = (value: number): string => {
  if (value >= 1000) {
    return numeral(value).format("0.000a").toUpperCase();
  }
  
  return value < 1 ? value.toFixed(4) : value.toPrecision(4);
};

/**
 * Calculate cumulative totals for bids.
 * @param levels - Array of order levels.
 * @returns A new array with cumulative totals.
 */
export const calculateTotal = (levels: Order[]): OrderLevel[] => {
  let cumulative: number = 0;
  
  return levels.map((level) => {
    const amount: number = level.amount;
    const formattedAmount =  formatToFourDigits(amount);
    cumulative += amount;
    return { ...level, amount: formattedAmount, total: formatToFourDigits(cumulative) };
  });
};
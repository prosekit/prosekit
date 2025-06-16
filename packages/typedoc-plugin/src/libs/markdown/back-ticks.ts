import { escapeChars } from '@plugin/libs/utils/index.js';

/**
 * Wraps a string in backticks.
 */
export function backTicks(text: string) {
  // If the input string itself contains a pipe, or backslash (which can result in unwanted side effects) the string is escaped instead.
  if (/(\||\\)/g.test(text)) {
    return escapeChars(text);
  }
  // If the input string itself contains a backtick, the string is wrapped in double backticks.
  if (/`/g.test(text)) {
    return `\`\` ${text} \`\``;
  }
  // Otherwise, the string is wrapped in single backticks.
  return `\`${text}\``;
}

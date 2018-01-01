/**
 * This function trims the spaces from the pased in word.
 * Delete all pre and trailing spaces around the word.
 *
 * @param {string} inword The word to trim.
 */
export default inword => {
  if (!inword) {
    return '';
  }

  const word = inword.toString();
  let i = 0;
  let j = word.length - 1;
  while (word.charAt(i) === ' ') i++;
  while (word.charAt(j) === ' ') j = j - 1;

  if (i > j) {
    return word.substring(i, i);
  }

  return word.substring(i, j + 1);
};

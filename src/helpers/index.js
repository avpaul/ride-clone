/**
 *
 * @param {Number} value
 * @returns {string} paddedValue
 */
export const pad = value => {
  if(!value){
    return '';
  }
  if (value.toString().length === 1) {
    return `0${value}`;
  }
  return value.toString();
};

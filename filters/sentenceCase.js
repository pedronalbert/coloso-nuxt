export default function (str) {
  if (typeof str !== 'string' || str.length === 0) {
    return null;
  }

  return `${str[0].toUpperCase()}${str.substring(1)}`;
}

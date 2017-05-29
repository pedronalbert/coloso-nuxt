import numeral from 'numeral';

export default function (value, format) {
  return numeral(value).format(format);
}

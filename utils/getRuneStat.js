const AMOUNT_REGEX = /^((\+|-)?\d+((\.|,)\d+)?)/g;
const TYPE_REPLACE_REGEX = /^((\+|-)?\d+((\.|,)\d+)?)%?/g;

export default function (description) {
  const amountRegexMatches = description.match(AMOUNT_REGEX);
  const type = description.replace(TYPE_REPLACE_REGEX, '').trim();

  let amount = Number(amountRegexMatches[0].replace(',', '.'));

  if (description[0] === '-') {
    amount *= -1;
  }

  return { type, amount };
}

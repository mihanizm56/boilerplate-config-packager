export const phoneMaskPipe = (mask: Array<string | RegExp>) => (
  conformedValue: string,
): string => {
  let nonChangedValues;
  // get constant values
  if (typeof mask[0] === 'string' && typeof mask[1] === 'string') {
    nonChangedValues = mask[0] + mask[1];
  }

  // get regexp for formatting
  const regexp = new RegExp(`(\\${nonChangedValues})|([^_])`, 'g');

  // string for number values and - and -- only
  let valuesString = '';
  // get from '+7 (123) 2123-__' => '+7 (XXX) XXXX-__'
  let formattedString = conformedValue.replace(regexp, (match, p1, p2) => {
    if (p2) {
      valuesString += p2;

      return 'X';
    }

    return match;
  });

  // slice -- if there is in the end of valuesString
  if (/--$/.test(valuesString)) {
    valuesString = valuesString.slice(0, -2);
  }

  // slice - if there is in the end of valuesString
  if (/[ -]$/.test(valuesString)) {
    valuesString = valuesString.slice(0, -1);
  }

  // put values back
  valuesString.replace(/./g, (match: string) => {
    formattedString = formattedString.replace('X', match);

    return match;
  });

  // replace unnecessary X from formattedString
  if (formattedString.includes('X')) {
    formattedString = formattedString.replace(/X/g, '');
  }

  return formattedString;
};

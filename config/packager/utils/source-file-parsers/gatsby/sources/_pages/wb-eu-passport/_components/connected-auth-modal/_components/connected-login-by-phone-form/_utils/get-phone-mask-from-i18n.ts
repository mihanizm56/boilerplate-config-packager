import { PHONE_MASK } from '@/_constants/validations/patterns';

export const getPhoneMaskFromI18n = (
  maskPlaceholder: string,
): Array<string | RegExp> => {
  const isTranslateError = maskPlaceholder === 'phone-mask-placeholder';

  if (isTranslateError) {
    return PHONE_MASK;
  }

  return maskPlaceholder
    .split('')
    .map((char) => (/\d/.test(char) ? new RegExp('\\d') : char));
};

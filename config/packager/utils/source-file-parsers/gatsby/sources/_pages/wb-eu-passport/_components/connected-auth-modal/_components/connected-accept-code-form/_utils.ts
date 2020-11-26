export const normalizeCodeInput = (value: string): string => {
  const normalizedResult = value.replace(/[^\d]/g, '');

  // undefined because we dont wnt to trigger validation if empty
  return normalizedResult || undefined;
};

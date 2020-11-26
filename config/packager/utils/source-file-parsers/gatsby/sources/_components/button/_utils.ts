import { ButtonVariant } from './types';

type ParamsType = {
  variant: ButtonVariant;
  disabled?: boolean;
};

export const getPreloaderColor = ({ variant, disabled }: ParamsType) => {
  if (variant === 'main') {
    if (disabled) {
      return 'Violet';
    }

    return 'White';
  }

  return 'Violet';
};

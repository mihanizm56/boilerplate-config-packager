import { Selector } from 'testcafe';

// переключаемся на форму ввода кода смс
export const navigateToAcceptForm = async browser => {
  const phoneInput = Selector('input[data-find="phone-input"]');
  const submitButtonComponent = Selector('button[data-find="submit-button"]');

  await browser.typeText(phoneInput, '9229788261').click(submitButtonComponent);
};

import { Selector } from 'testcafe';

// переключаемся на страницу акта
export const navigateToActPage = async browser => {
  const firstTableListItem = Selector(
    'div[data-find="table-acts"] div[role="button"]',
  );

  await browser.click(firstTableListItem);
};

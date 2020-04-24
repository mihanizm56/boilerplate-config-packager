import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';
import { mockManualRequests } from '../../../_utils/mock-requests';

fixture`Home page elements test`.page`${pageUrl}`
  .requestHooks(mockManualRequests())
  .beforeEach(async browser => {
    await browser.maximizeWindow().wait(2000);
  });

test('get select contract', async browser => {
  const component = Selector('div[data-find="select-contract"]').exists;

  await browser.expect(component).ok();
});

test('get select period', async browser => {
  const component = Selector('[data-find="select-period"]').exists;

  await browser.expect(component).ok();
});

test('get button create act', async browser => {
  const component = Selector('[data-find="button-create-act"]').exists;

  await browser.expect(component).ok();
});

test('get table', async browser => {
  const component = Selector('div[data-find="table-acts"]').exists;

  await browser.expect(component).ok();
});

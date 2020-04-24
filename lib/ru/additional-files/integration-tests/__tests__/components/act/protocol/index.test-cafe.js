import { Selector } from 'testcafe';
import { pageUrl } from '../../../../_constants';
import { mockManualRequests } from '../../../../_utils/mock-requests';
import { navigateToActPage } from '../../../../_utils/navigate-to-act-page';

fixture`Protocol module in act page test`.page`${pageUrl}`
  .requestHooks(mockManualRequests())
  .beforeEach(async (browser) => {
    await browser.maximizeWindow().wait(2000);
  });

test.skip('get protocol form', async (browser) => {
  await navigateToActPage(browser);

  const textComponent = Selector("div[data-find='discrepancy-value']");

  await browser.typeText(textComponent, '555');

  const protocolForm = Selector("div[data-find='protocol-form']");

  await browser.expect(protocolForm.count).eql(1);
});

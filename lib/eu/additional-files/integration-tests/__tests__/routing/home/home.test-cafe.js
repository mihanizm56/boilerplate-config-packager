import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';
import { mockManualRequests } from '../../../_utils/mock-requests';

fixture`routing/home`.page`${pageUrl}`.requestHooks(mockManualRequests());

test.skip('get home page selector', async browser => {
  const homePage = Selector('div[data-page="home"]');

  await browser.expect(homePage.count).eql(1);
});

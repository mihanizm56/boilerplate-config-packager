import { Selector, RequestMock } from 'testcafe';
import { pageUrl } from '../../_constants';
import { mockManualRequests } from '../../_utils/mock-requests';

fixture`Home page routing test`.page`${pageUrl}/foo/bar`
  .requestHooks(mockManualRequests())
  .beforeEach(async (browser) => {
    await browser.maximizeWindow().wait(2000);
  });

test.skip('get home page if the initial url is not home', async (browser) => {
  const pageComponent = Selector("div[data-page='home']");

  await browser.expect(pageComponent.count).eql(1);
});

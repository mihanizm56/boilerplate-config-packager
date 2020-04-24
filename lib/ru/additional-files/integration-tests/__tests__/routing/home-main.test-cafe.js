import { Selector, RequestMock } from 'testcafe';
import { pageUrl } from '../../_constants';
import { mockManualRequests } from '../../_utils/mock-requests';
import { navigateToActPage } from '../../_utils/navigate-to-act-page';

fixture`Home page routing test`.page`${pageUrl}`
  .requestHooks(mockManualRequests())
  .beforeEach(async (browser) => {
    await browser.maximizeWindow().wait(2000);
  });

test.skip('get home page', async (browser) => {
  const pageComponent = Selector("div[data-page='home']");

  await browser.expect(pageComponent.count).eql(1);
});

test.skip('get revise page after click on table item', async (browser) => {
  await navigateToActPage(browser);

  const revisePageWrapper = Selector("div[data-page='revise']");

  await browser.expect(revisePageWrapper.count).eql(1);
});

test.skip('get home page after click on table item and go to back button', async (browser) => {
  await navigateToActPage(browser);

  const backBreadcrumbsButton = Selector('div[data-find="BreadCrumbs"] button');

  await browser.click(backBreadcrumbsButton);

  const pageComponent = Selector("div[data-page='home']");

  await browser.expect(pageComponent.count).eql(1);
});

test.skip('get home page after click on table item and go back by the prev breadcrumb', async (browser) => {
  await navigateToActPage(browser);

  // the whole breadcrumbs count is 3
  const breadcrumbsPrevLink = Selector('div[data-find="BreadCrumbs"] button');

  await browser.click(breadcrumbsPrevLink);

  const pageComponent = Selector("div[data-page='home']");

  await browser.expect(pageComponent.count).eql(1);
});

import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';
import { mockRequests } from './_utils/mock-requests';

fixture`business-cases/case-1`.page`${pageUrl}`.requestHooks(mockRequests());

test.skip('test', async browser => {
  const loginForm = Selector('form[data-find="login-form"]');

  await browser.expect(loginForm.count).eql(1);
});

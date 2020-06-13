import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';
import { mockRequests } from './_utils/mock-requests';

fixture`business-cases/case-4`
  .page`${pageUrl}?redirect_url=http://192.168.0.100:3000&client_id=213&csrf_token=213`.requestHooks(
  mockRequests(),
);

test('test', async browser => {
  const loginForm = Selector('form[data-find="login-form"]');

  await browser.expect(loginForm.count).eql(1);
});

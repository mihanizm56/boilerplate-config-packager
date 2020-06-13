import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';
import { mockRequests } from './_utils/mock-requests';

fixture`business-cases/case-3`.page`${pageUrl}`.requestHooks(mockRequests());

test('test', async browser => {
  const phoneInput = Selector('input[data-find="phone-input"]');
  const submitButtonComponent = Selector('button[data-find="submit-button"]');
  const codeInput = Selector('input[data-find="code-input"]');
  const acceptForm = Selector('form[data-find="accept-form"]');

  await browser
    .typeText(phoneInput, '9999788261')
    .click(submitButtonComponent)
    .typeText(codeInput, '999978')
    .wait(1000)
    .expect(acceptForm.count)
    .eql(1);
});

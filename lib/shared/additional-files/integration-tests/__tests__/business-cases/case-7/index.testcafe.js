import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';
import { mockRequests } from './_utils/mock-requests';

fixture`business-cases/case-7`.page`${pageUrl}`.requestHooks(mockRequests());

test('test', async browser => {
  const phoneInput = Selector('input[data-find="phone-input"]');
  const submitButtonComponent = Selector('button[data-find="submit-button"]');
  const errorCodeTextComponent = Selector('span[data-find="code-error"]');
  const codeInput = Selector('input[data-find="code-input"]');

  await browser
    .typeText(phoneInput, '9999788261')
    .click(submitButtonComponent)
    .typeText(codeInput, '999978')
    .wait(1000)
    .expect(errorCodeTextComponent.count)
    .eql(1);
});

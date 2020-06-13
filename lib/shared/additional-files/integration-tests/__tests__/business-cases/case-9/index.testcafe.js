import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';
import { mockRequests } from './_utils/mock-requests';

fixture`business-cases/case-9`.page`${pageUrl}`.requestHooks(mockRequests());

test('test', async browser => {
  const phoneInput = Selector('input[data-find="phone-input"]');
  const submitButtonComponent = Selector('button[data-find="submit-button"]');
  const errorCodeTextComponent = Selector('span[data-find="code-error"]');
  const codeInput = Selector('input[data-find="code-input"]');
  const repeatCodeButtonComponent = Selector(
    'button[data-find="repeat-button"]',
  );

  await browser
    .typeText(phoneInput, '9999788261')
    .click(submitButtonComponent)
    .typeText(codeInput, '999978')
    .expect(errorCodeTextComponent.count)
    .eql(1)
    .click(repeatCodeButtonComponent)
    .wait(3000)
    .selectText(codeInput)
    .pressKey('delete')
    .typeText(codeInput, '123123')
    .expect(errorCodeTextComponent.count)
    .eql(0);
});

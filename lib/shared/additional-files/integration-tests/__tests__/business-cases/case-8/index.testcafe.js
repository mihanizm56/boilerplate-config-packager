import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';
import { mockRequests } from './_utils/mock-requests';

fixture`business-cases/case-8`.page`${pageUrl}`.requestHooks(mockRequests());

test('test', async browser => {
  const phoneInput = Selector('input[data-find="phone-input"]');
  const submitButtonComponent = Selector('button[data-find="submit-button"]');
  const errorPhoneTextComponent = Selector('span[data-find="phone-error"]');

  await browser
    .typeText(phoneInput, '9999788261')
    .click(submitButtonComponent)
    .expect(errorPhoneTextComponent.count)
    .eql(1);
});

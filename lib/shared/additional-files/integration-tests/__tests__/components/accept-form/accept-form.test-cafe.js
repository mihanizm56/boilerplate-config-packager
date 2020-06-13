import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';
import { mockManualRequests } from '../../../_utils/mock-requests';
import { navigateToAcceptForm } from '../../../_utils/navigate-to-accept-form';

fixture`components/accept-form`.page`${pageUrl}`
  .requestHooks(mockManualRequests())
  .beforeEach(async browser => {
    await navigateToAcceptForm(browser);
  });

test('get titleTextComponent in accept form', async browser => {
  const titleTextComponent = Selector('span[data-find="accept-title"]');
  await browser.expect(titleTextComponent.count).eql(1);
});

test('get acceptForm in accept form', async browser => {
  const acceptForm = Selector('form[data-find="accept-form"]');
  await browser.expect(acceptForm.count).eql(1);
});

test('get codeInput in accept form', async browser => {
  const codeInput = Selector('input[data-find="code-input"]');
  await browser.expect(codeInput.count).eql(1);
});

test('get repeatCodeButtonComponent in accept form', async browser => {
  const repeatCodeButtonComponent = Selector(
    'button[data-find="repeat-button"]',
  );
  await browser.expect(repeatCodeButtonComponent.count).eql(1);
});

test('get checkboxOffertaComponent in accept form', async browser => {
  const checkboxOffertaComponent = Selector(
    'label[data-find="checkbox-offerta"]',
  );
  await browser.expect(checkboxOffertaComponent.count).eql(1);
});

test('get linkComponent in accept form', async browser => {
  const linkComponent = Selector('a[data-find="link"]');
  await browser.expect(linkComponent.count).eql(1);
});

test('get backButtonComponent in accept form', async browser => {
  const backButtonComponent = Selector('button[data-find="back-button"]');
  await browser.expect(backButtonComponent.count).eql(1);
});

test('get sendedPhoneNumberTextComponent in accept form', async browser => {
  const sendedPhoneNumberTextComponent = Selector(
    'span[data-find="sended-phone-number"]',
  );
  await browser.expect(sendedPhoneNumberTextComponent.count).eql(1);
});

test('get timerTextComponent in accept form', async browser => {
  const timerTextComponent = Selector('span[data-find="timer-text"]');
  await browser.expect(timerTextComponent.count).eql(1);
});

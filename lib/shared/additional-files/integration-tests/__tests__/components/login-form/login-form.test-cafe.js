import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';

fixture`components/login-form`.page`${pageUrl}`.beforeEach(() => {});

test('get titleTextComponent in login form', async browser => {
  const titleTextComponent = Selector('span[data-find="login-title"]');
  await browser.expect(titleTextComponent.count).eql(1);
});

test('get loginForm in login form', async browser => {
  const loginForm = Selector('form[data-find="login-form"]');
  await browser.expect(loginForm.count).eql(1);
});

test('get phoneInput in login form', async browser => {
  const phoneInput = Selector('input[data-find="phone-input"]');
  await browser.expect(phoneInput.count).eql(1);
});

test('get submitButtonComponent in login form', async browser => {
  const submitButtonComponent = Selector('button[data-find="submit-button"]');
  await browser.expect(submitButtonComponent.count).eql(1);
});

test('get checkboxDiscountComponent in login form', async browser => {
  const checkboxDiscountComponent = Selector(
    'label[data-find="checkbox-discount"]',
  );
  await browser.expect(checkboxDiscountComponent.count).eql(1);
});

test('get checkboxOffertaComponent in login form', async browser => {
  const checkboxOffertaComponent = Selector(
    'label[data-find="checkbox-offerta"]',
  );
  await browser.expect(checkboxOffertaComponent.count).eql(1);
});

test('get linkComponent in login form', async browser => {
  const linkComponent = Selector('a[data-find="link"]');
  await browser.expect(linkComponent.count).eql(1);
});

import { Selector } from 'testcafe';
import { pageUrl } from '../../../_constants';

fixture`components/login-form`.page`${pageUrl}`.beforeEach(() => {});

test.skip('get titleTextComponent in login form', async browser => {
  const titleTextComponent = Selector('span[data-find="login-title"]');
  await browser.expect(titleTextComponent.count).eql(1);
});

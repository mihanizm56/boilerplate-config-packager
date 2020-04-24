import { pageUrl } from "../../../../_constants";
import { mockManualRequests } from "../../../../_utils/mock-requests";
import { navigateToActPage } from "../../../../_utils/navigate-to-act-page";
import { Selector } from "testcafe";
import { getFirstActField } from "../../../../_utils/get-first-act-field";

fixture`Balance module in act  page test`.page`${pageUrl}`
  .requestHooks(mockManualRequests())
  .beforeEach(async browser => {
    await browser.maximizeWindow().wait(2000);
  });

test("get title text", async browser => {
  await navigateToActPage(browser);

  const textComponent = Selector("div[data-find='text'] span");

  await browser.expect(textComponent.count).eql(1);
});

test("get text amount supplier", async browser => {
  await navigateToActPage(browser);

  const textComponent = Selector("div[data-find='text-sum-supplier']");

  await browser.expect(textComponent.count).eql(1);
});

test("get amount supplier value", async browser => {
  await navigateToActPage(browser);

  const textComponent = Selector("div[data-find='sum-supplier-value']");

  await browser.expect(textComponent.count).eql(1);
});

test("get text amount wildberries", async browser => {
  await navigateToActPage(browser);

  const textComponent = Selector("div[data-find='text-sum-wildberries']");

  await browser.expect(textComponent.count).eql(1);
});

test("get amount wildberries value", async browser => {
  await navigateToActPage(browser);

  const textComponent = Selector("div[data-find='sum-wildberries-value'] span")
    .innerText;

  const expectedValue = getFirstActField("amount");

  await browser.expect(textComponent).contains(expectedValue);
});

test("get text discrepancy", async browser => {
  await navigateToActPage(browser);

  const textComponent = Selector("div[data-find='text-discrepancy']");

  await browser.expect(textComponent.count).eql(1);
});

test("get discrepancy value", async browser => {
  await navigateToActPage(browser);

  const textComponent = Selector("div[data-find='discrepancy-value']");

  await browser.expect(textComponent.count).eql(1);
});

import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const QUESTIONS_SELECTOR = '.SG0AAe';
const ANSWER_SELECTOR = '.nWQGrd.zwllIb > label';
const AGE_SELECTOR = 'label[for="i575"]';
const GENDER_SELECTOR = () => Math.random() < 0.5 ? 'label[for="i588"]' : 'label[for="i591"]';
const SUBMIT_BUTTON_SELECTOR = '.l4V7wb.Fxmcue';
const ANOTHER_RESPONSE_SELECTOR = '.c2gzEf > a';

for (let i = 0; i < 1000; ++i) {
  await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSc83TH86zoFLrqrcQBlY6f5nXdE-IXjDb4fqaGvt0T_LQbkiw/viewform');

  const questionNodes = await page.$$(QUESTIONS_SELECTOR);

  for (const questionNode of questionNodes) {
    const answerNodes = await questionNode.$$(ANSWER_SELECTOR);

    const answer = answerNodes[answerNodes.length * Math.random() | 0];

    if (answer) {
      await answer.click();
    }
  }

  // await page.click(AGE_SELECTOR);
  await page.click(GENDER_SELECTOR());
  await page.click(SUBMIT_BUTTON_SELECTOR);

  try {
    await page.waitForSelector(ANOTHER_RESPONSE_SELECTOR, { timeout: 3000 });
  } catch { }

  console.log(`Submitted form at ${Date.now()}`);
}

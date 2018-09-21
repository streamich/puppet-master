const puppeteer = require('puppeteer');

const defaultBrowserOptions = {
  // headless: false,
};

const execute = async ({func, module, args = [], browserOptions = {}}) => {
  const browser = await puppeteer.launch({
    ...defaultBrowserOptions,
    ...browserOptions,
  });
  const page = await browser.newPage();
  const result = await page.evaluate(func, ...args);

  await browser.close();

  return result;
};

exports.execute = execute;

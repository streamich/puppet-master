const puppeteer = require('puppeteer');
const Bundler = require('parcel-bundler');
const path = require('path');
const fs = require('fs');

const readFile = (file, opts) => new Promise((resolve, reject) => {
  fs.readFile(file, opts, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const createBundle = async (entryFiles, options = {}) => {
  const combinedOptions = {
    outDir: '.puppet-master', // The out directory to put the build files in, defaults to dist
    outFile: '', // The name of the outputFile
    publicUrl: '', // The url to server on, defaults to dist
    watch: false, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: true, // Enabled or disables caching, defaults to true
    cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
    contentHash: false, // Disable content hash from being included on the filename
    minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
    scopeHoist: false, // turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
    target: 'browser', // browser/node/electron, defaults to browser
    logLevel: 1, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
    hmr: false, //Enable or disable HMR while watching
    hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
    sourceMaps: false, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
    hmrHostname: '', // A hostname for hot module reload, default to ''
    detailedReport: false, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
    ...options,
  };
  const bundler = new Bundler(entryFiles, combinedOptions);
  const bundle = await bundler.bundle();
  const result = await readFile(bundle.name, 'utf8');

  return [result, bundle.entryAsset.id];
};

const createBrowserAndPage = async (browserOptions) => {
  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();

  return [browser, page];
};

const defaultBrowserOptions = {
};

const execute = async ({
  func,
  module,
  args = [],
  browserOptions = {},
  parcelOptions = {},
  debug,
}) => {
  const modulePath = path.resolve(module);

  if (!parcelOptions.outFile) {
    parcelOptions.outFile = Buffer.from(modulePath).toString('base64');
  }

  browserOptions = {
    ...defaultBrowserOptions,
    ...browserOptions,
  };

  if (debug) {
    browserOptions.headless = false;
  }

  const [[browser, page], [bundle, entryModuleName]] = await Promise.all([
    createBrowserAndPage(browserOptions),
    createBundle(modulePath, parcelOptions),
  ]);
  const code = `(${func.toString()})(${bundle}('${entryModuleName}'),${JSON.stringify(args)})`;
  const result = await page.evaluate(code, ...args);

  if (!debug) {
    await browser.close();
  }

  return result;
};

exports.execute = execute;

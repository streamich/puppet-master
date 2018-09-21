# puppet-master

- Execute Node.js code in Chrome using [`puppeteer`](https://github.com/GoogleChrome/puppeteer).
- Bundles Node.js module into Chrome using [`parcel`](https://github.com/parcel-bundler/parcel).

Import `execute` function.

```js
const {execute} = require('puppet-master');
```

Get Chrome `location.href` and interact with DOM APIs.

```js
await execute(() => window.location.href);
// about:blank

await execute(() => {
  const div = document.createElement('div');
  div.id = 'test';
  div.innerHTML = 'Hello...';
  document.body.appendChild(div);
  const el = document.getElementById('test');

  return el.innerHTML;
});
// Hello...
```

Execute Node.js module in Chrome, also provide arguments:

```js
// my-module.js
export.add = (a, b) => a + b;

// index.js
const func = ({add}, [a, b]) => add(a, b);
await execute({
  func,
  args: [1, 2],
  module: __dirname + '/my-module.js',
});
// 3
```

Execute `fetch` from Chrome.

```js
await execute(async () => {
  const response = await fetch('https://api.github.com/users/octocat');
  return await response.json();
});
// { login: 'octocat', ...
```

## Options

```js
await execute({
  func, // Function to execute. It receives two arguments: module and args.
  module: __dirname + '/module.js', // Path to module, which to evaluate and provide to function.
  args: [1, 2], // Arguments to pass to the function as the second argument.
  browserOptions, // Puppeteer browser options.
  parcelOptions, // Parcel options.
  debug: false, // If true will open browser and not close it.
});
```


## License

[Unlicense](./LICENSE) &mdash; public domain.

# puppet-master

Import.

```js
const {execute} = require('puppet-master');
```

Get Chrome `location.href`.

```js
await execute({func: () => window.location.href});
// about:blank
```

Execute Node.js module in Chrome.

```js
const func = ({add}, [a, b]) => add(a, b);
await execute({
  func,
  args: [1, 2],
  module: __dirname + '/module.js',
});
// 3
```


## Options

```js
await execute({
  func, // Function to execute. It receives two arguments: module and args.
  module: __dirname + '/module.js', // Path to module, which to evaluate and provide to function.
  args: [1, 2], // Arguments to pass to the function ad the second argument.
  browserOptions, // Puppeteer browser options.
  parcelOptions, // Parcel options.
  debug: false, // If true will open browser and not close it.
});
```


## License

[Unlicense](./LICENSE) &mdash; public domain.

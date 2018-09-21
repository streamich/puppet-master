# puppet-master

Execute Node.js module in Chrome.

```js
const {execute} = require('puppet-master');
const func = ({add}, [a, b]) => add(a, b);

execute({
  func,
  args: [1, 2],
  module: __dirname + '/module.js',
})
  .then(console.lo, console.log);

// Prints: 3
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

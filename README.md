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


## License

[Unlicense](./LICENSE) &mdash; public domain.

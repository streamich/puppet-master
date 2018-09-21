# puppet-master

Execute Node.js module in Chrome.

```js
const {execute} = require('puppet-master');
const func = module => module.add(2, 2);

execute({
  func,
  module: __dirname + '/module.js',
})
  .then(console.lo, console.log);
```

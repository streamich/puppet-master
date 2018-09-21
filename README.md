# puppet-master

Execute Node.js module in Chrome.

```js
const {runInChrome} = require('puppet-master');

const func = (module) => module.add(2, 2);

runInChrome(func, __dirname + '/module.js');
```

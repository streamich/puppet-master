const {execute} = require('.');

const func = (module) => module.add(1, 1);

execute({
  func,
  module: __dirname + '/module.js',
}).then(console.log, console.error);

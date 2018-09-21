const {execute} = require('.');

const func = ({add}, [a, b]) => add(a, b);

execute({
  func,
  args: [1, 2],
  module: __dirname + '/module.js',
}).then(console.log, console.error);

const {execute} = require('.');

const func = ({add}, [a, b]) => add(a, b);

execute({
  func,
  args: [1, 2],
  module: __dirname + '/module.js',
}).then((res) => {
  if (res !== 3) {
    console.error('expected 3, received ' + res);
    process.exit(1);
  } else {
    console.log('Test passed!');
  }
}, () => process.exit(1));

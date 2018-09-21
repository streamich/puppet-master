const {execute} = require('.');

const func = () => 2 + 2;

execute({func}).then(console.log, console.error);

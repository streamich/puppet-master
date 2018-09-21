const {execute} = require('.');
const {deepStrictEqual} = require('assert');

const test = async () => {
  let res;

  console.log(' 🎲  Can bundle module and arguments.');
  const func = ({add}, [a, b]) => add(a, b);
  res = await execute({
    func,
    args: [1, 2],
    module: __dirname + '/module.js',
  });
  deepStrictEqual(res, 3);


  console.log(' 🎲  Can execute a single function.');
  res = await execute(() => 1 + 1);
  deepStrictEqual(res, 2);


  console.log(' 🎲  Can access DOM APIs 1');
  res = await execute(() => window.location.href);
  deepStrictEqual(res, 'about:blank');

  console.log(' 🎲  Can access DOM APIs 2');
  res = await execute(() => {
    const div = document.createElement('div');
    div.id = 'test';
    div.innerHTML = 'Hello...';
    document.body.appendChild(div);
    const el = document.getElementById('test');
    return el.innerHTML;
  });
  deepStrictEqual(res, 'Hello...');

  console.log(' 🎲  Allow async functions');
  res = await execute(async () => {
    await new Promise(r => setTimeout(r, 100));
    return 'done';
  });
  deepStrictEqual(res, 'done');

  console.log(' 🎲  Allow async functions');
  res = await execute(async () => {
    const response = await fetch('https://api.github.com/users/octocat');
    return await response.json();
  });
  deepStrictEqual(res.login, 'octocat');
};

test().then(() => {}, console.error);

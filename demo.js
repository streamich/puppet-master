const {execute} = require('.');

const main = async () => {
  console.log(
    await execute({
      func: () => window.location.href,
    })
  );

  console.log(
    await execute({
      func: () => {
        const div = document.createElement('div');
        div.id = 'test';
        div.innerHTML = 'Hello...';
        document.body.appendChild(div);
        const el = document.getElementById('test');

        return el.innerHTML;
      },
    })
  );
};

main().then(console.log, console.error);

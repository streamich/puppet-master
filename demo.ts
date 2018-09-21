const {execute} = require('.');

const main = async () => {
  console.log(
    await execute({
      func: () => window.location.href,
    })
  );
};

main().then(console.log, console.error);

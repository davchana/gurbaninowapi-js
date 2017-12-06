const GurbaniNow = require('gurbaninow');
const fetch = require('node-fetch');
const chalk = require('chalk');

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const url = GurbaniNow.buildApiUrl({ id: getRandomInt(1, 5540) });

fetch(url)
  .then(r => r.json())
  .then(r => {
    if (r.error) {
      console.log(chalk.red(`Sorry! Couldn't Fetch the Shabad :(`));
    } else {
      const { shabad: lines } = r;

      console.log(lines
        .map(({ line }) => `
          ${chalk.blue(line.gurmukhi.unicode)}
            ${chalk.white.bgBlack(line.translation.english.default)}
        `)
        .join('\n')
      );
    }
  })
  .catch(err => {
    console.log(chalk.red(`Sorry! Couldn't Fetch the Shabad :(`));
    console.log(err);
  });

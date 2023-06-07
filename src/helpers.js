import { readFile, writeFile } from 'node:fs/promises';
import * as readline from 'node:readline/promises'; // eslint-disable-line
import { stdin as input, stdout as output } from 'node:process';
import _ from 'lodash'; // eslint-disable-line

export const readFileAsync = async () => {
  const filePath = new URL('./user.json', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
};

export const writeFileAsync = async (filePath, data) => {
  const addr = new URL(filePath, import.meta.url);
  await writeFile(addr, data, { encoding: 'utf8' });
};

export const registration = async () => {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question('Как вас зовут? ');

  const capitalizedAnswer = _.capitalize(answer);
  console.log(`Спасибо за регистрацию, ${capitalizedAnswer}!`);

  rl.close();
  return capitalizedAnswer;
};

export const routeInformation = async () => {
  const link = 'http://api.weatherstack.com/current?access_key=3ec035a6c71364180f51f129f7014668';

  const rl = readline.createInterface({ input, output });
  const answerStartCity = await rl.question('Откуда вы летите? ');
  const answerEndCity = await rl.question('Куда вы летите? ');
  const capitalizeCities = [_.capitalize(answerStartCity), _.capitalize(answerEndCity)];
  console.log(`${capitalizeCities[0]} => ${capitalizeCities[1]}`);

  const result = await fetch(`${link}&query=${capitalizeCities[1]}`);
  const data = await result.json();

  rl.close();

  return data;
};

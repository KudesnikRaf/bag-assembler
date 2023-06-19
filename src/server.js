import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';

// import morgan from 'morgan';

const app = express();
// const logger = morgan('combined'); // отладка и мониторинг процессов
// app.use(logger);
app.use(express.json()); // парсинг тела запроса в формате JSON.

// Получение абсолютного пути к текущей директории
const __filename = fileURLToPath(import.meta.url); // eslint-disable-line
const __dirname = dirname(__filename); // eslint-disable-line

// Создание абсолютного пути к файлам user.json и personalization.json
const usersDirectory = path.resolve(__dirname, '../database/users/');
const userFilePath = path.join(usersDirectory, 'user.json');
const personalizationFilePath = path.join(usersDirectory, 'personalization.json');

// Сохранение имени пользователя
app.post('/save-username', (req, res) => {
  const {
    days, city,
  } = req.body;
  const data = {
    days, city,
  };

  // Сохранение имени пользователя в файл в формате JSON
  fs.writeFile(userFilePath, JSON.stringify(data))
    .then(() => {
      console.log('Имя пользователя успешно сохранено на сервере.');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Сохранение информации из формы персонализации
app.post('/save-personalization', (req, res) => {
  const {
    days,
    cities,
    health,
    children,
    pets,
    accommodation,
  } = req.body;
  const data = {
    days,
    cities,
    health,
    children,
    pets,
    accommodation,
  };

  // Сохранение информации в файл в формате JSON
  fs.writeFile(personalizationFilePath, JSON.stringify(data))
    .then(() => {
      console.log('Информация успешно сохранена на сервере.');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Получение сохраненных данных
app.get('/get-data', async (req, res) => {
  try {
    const userData = await fs.readFile(userFilePath, 'utf-8');
    const personalizationData = await fs.readFile(
      personalizationFilePath,
      'utf-8',
    );

    const data = {
      user: JSON.parse(userData),
      personalization: JSON.parse(personalizationData),
    };

    console.log('Анализ прошёл');
    res.status(200).json(data); // Отправка статуса 200 и данных в формате JSON
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//

app.use(express.static(__dirname));

export default app;

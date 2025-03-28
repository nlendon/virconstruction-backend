import { Database } from './database/database.init';
import App from './app';
import https from 'https';
import fs from 'fs';
import 'dotenv/config';

const Main = async (): Promise<void> => {
  try {
    await Database.authenticate();
    await Database.sync({ force: false });

    // Пути к сертификату и ключу
    const options = {
      cert: fs.readFileSync('../../../ssl/certs/api_virconstruction_narimanyan_info_d4370_40567_1750931642_d12e280b6e09eaf6ca0c5b941280c268.crt'),
      key: fs.readFileSync('../../../ssl/private/d4370_40567_1803b5ea92dca98ea3cab10246bcbe8a.key'), // Укажи правильный путь к ключу
    };

    // Запускаем HTTPS-сервер
    https.createServer(options, App).listen(
      parseInt(process.env.PORT!), 
      process.env.HOST!, 
      () => {
        console.log(`Server started on https://${process.env.HOST}:${process.env.PORT}`);
      }
    );

  } catch (e) {
    console.log(`error: ${e}`);
  }
};

Main();

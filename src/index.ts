import { Database } from './database/database.init';
import App from './app';
import https from 'https';
import fs from 'fs';
import 'dotenv/config';
import path from 'path';

const Main = async (): Promise<void> => {
  try {
    await Database.authenticate();
    await Database.sync({ force: false });

    const options = {
      cert: fs.readFileSync(path.join(__dirname, '..', 'ssl/api-vircon-sert.crt')),
      key: fs.readFileSync(path.join(__dirname, '..', 'ssl/api-vircon-keey.key')),
    };

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

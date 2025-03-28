import { Database } from './database/database.init';
import App from './app';
import 'dotenv/config';

const Main = async (): Promise<void> => {
  try {
    await Database.authenticate();
    await Database.sync({ force: false });
    
    App.listen(
      parseInt(process.env.PORT!), 
      process.env.HOST!,
      (): void => {
        console.log(`Server started on http://${process.env.HOST}:${process.env.PORT}`);
      }
    );
  } catch (e) {
    console.log(`error: ${e}`);
  }
};

Main();

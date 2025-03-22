import express, { Express } from 'express';
import cors from 'cors';
import path from 'node:path';
import router from './routes/router';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import './models';

const app: Express = express();

app.use(cors({ methods: '*' }));
app.use(express.json());
app.use(bodyParser({ limit: '50mb' }));
app.use(fileUpload({}));
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use('/', router);

export default app;
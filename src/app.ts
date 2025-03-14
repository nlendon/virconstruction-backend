import express, { Express } from 'express';
import cors from 'cors';
import path from 'node:path';
import * as fs from 'fs';
// import router from './routes';
// import './models';

const app: Express = express();

app.use(cors({ methods: '*' }));
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'static')));
// app.use('/', router);

export default app;
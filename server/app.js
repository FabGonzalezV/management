import express, { urlencoded } from 'express';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import requestLogger from './helpers/request-logger';
import morgan from 'morgan';
const CURRENT_WORKINK_DIRECTORY = process.cwd();
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(cors());
app.use(requestLogger);
app.use(morgan('dev'));
app.get('*', (req, res) => {
    res.status(200).send({ request: 'success' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});
export default app; 
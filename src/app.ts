import express from 'express';
import diagnosRouter from './routers/diagnos';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('api/ping', (_req, res) => {
    console.log('someone pingned here')

    res.status(200).send('pong')
});

app.use('api/diagnoses', diagnosRouter);

export default app;
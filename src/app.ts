import express from 'express';
import diagnosRouter from './routes/diagnos';
import patientsRouter from './routes/patients';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnosRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
    console.log('someone pingned here')

    res.status(200).send('pong')
});

export default app;
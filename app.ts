import express from 'express';

const app = express();

app.use(express.json());

app.get('api/ping', (_req, res) => {
    console.log('someone pingned here')

    res.status(200).send('pong')
});

export default app;
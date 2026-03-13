import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const route = express.Router();

route.get('/', (_req, res) => {
    res.status(200).json({ data: patientsService.getNonSensitiveData() });
});

route.get('/:id', (req, res) => {
    const foundPatient = patientsService.findById(req.params.id);

    if (foundPatient) {
        res.send(foundPatient);
    } else {
        res.sendStatus(404);
    }
});

route.post('/:id/entries', (req, res) => {
    try {
        const entryAdded = patientsService.addEntry(req.params.id, req.body);
        res.json(entryAdded);
    } catch (error: unknown) {
        res.status(400).send(error);
    }
});

route.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default route;
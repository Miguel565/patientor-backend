import express from 'express';
import patientsService from '../services/patientsService';

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

route.post('/', (req, res) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.status(201).json(addedPatient);
});

export default route;
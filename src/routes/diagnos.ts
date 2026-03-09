import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).json(diagnosesService.getDiagnosis());
});

router.post('/', (req, res) => {
    const diagnosis = req.body;
    res.status(201).json(diagnosesService.addDiagnoses(diagnosis));
});

export default router;
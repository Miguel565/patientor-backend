import data from '../data/diagnoses';
import type { Diagnosis } from '../types';

const getDiagnosis = (): Diagnosis[] => {
    return data;
}

const addDiagnoses = (diagnosis: Diagnosis): Diagnosis => {
    data.push(diagnosis);
    return diagnosis;
}

export default { getDiagnosis, addDiagnoses };
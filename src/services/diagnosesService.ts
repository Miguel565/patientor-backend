import data from '../data/diagnoses';
import type { Diagnoses } from '../types';

const getDiagnoses = (): Diagnoses[] => {
    return data;
}

export default { getDiagnoses };
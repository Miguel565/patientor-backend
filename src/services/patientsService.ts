import data from '../data/patients';
import type { PatientsPreview } from '../types';

const getNonSensitiveData = (): PatientsPreview[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default { getNonSensitiveData };
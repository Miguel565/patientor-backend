import { v1 as uuid } from 'uuid';
import data from '../data/patients';
import type { NewPatient, PatientsPreview, Patients } from '../types';

const getNonSensitiveData = (): PatientsPreview[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string): Patients | undefined =>{
    const patient = data.find(d => d.id === id);
    return patient;
};

const addPatient = (patient: NewPatient): Patients => {
    const newPatient = {
        id: uuid(),
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
        ssn: patient.ssn
    };

    data.push(newPatient);
    return newPatient;
}

export default {
    getNonSensitiveData,
    findById,
    addPatient
};
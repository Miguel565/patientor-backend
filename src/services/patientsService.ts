import { v1 as uuid } from 'uuid';
import data from '../data/patients';
import { type NewPatient, type PatientsPreview, Patient, Gender } from '../types';

const getNonSensitiveData = (): PatientsPreview[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => {
        if (!Object.values(Gender).includes(gender)) {
            throw new Error(`Invalid gender value: ${gender}`)
        }
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
};

const findById = (id: string): Patient | undefined =>{
    const patient = data.find(d => d.id === id);
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
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
import { v1 as uuid } from 'uuid';
import data from '../data/patients';
import { 
    type NewPatient, 
    type PatientsPreview, 
    Patient, 
    Gender, 
    EntryWithoutId, 
    Entry,
    Diagnosis
} from '../types';

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

const findById = (id: string): Patient | undefined => {
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


const addEntry = (id: string, entry: EntryWithoutId) => {
    const patient = findById(id);

    if (!patient) {
        throw new Error(`Patient with id: ${id}, not found`);
    }

    const diagnosCodes = parseDiagnosisCodes(entry.diagnosisCodes);

    const baseEntry = {
        id: uuid(),
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: diagnosCodes
    };

    let newEntry: Entry;

    switch (entry.type) {
        case "HealthCheck":
            newEntry = {
                ...baseEntry,
                type: entry.type,
                healthCheckRating: entry.healthCheckRating
            };
            break;
        case "Hospital":
            newEntry = {
                ...baseEntry,
                type: entry.type,
                discharge: entry.discharge
            };
            break;
        case "OccupationalHealthcare":
            newEntry = {
                ...baseEntry,
                type: entry.type,
                ...(entry.sickLeave && { sickLeave: entry.sickLeave }),
                employerName: entry.employerName
            };
            break;
        default:
            throw new Error(`Unhandled entry type: ${JSON.stringify(entry)}`);
    }
    patient.entries = patient.entries ?? [];
    patient.entries?.push(newEntry);
    return newEntry;
}

export default {
    getNonSensitiveData,
    findById,
    addPatient,
    addEntry
};
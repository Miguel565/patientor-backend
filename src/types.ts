export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export type PatientsPreview = Omit<Patients, "ssn" | "entries">;

export type NewPatient = Omit<Patients, "id">;
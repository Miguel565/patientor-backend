import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect date of birth: " + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect gender: " + gender);
    }

    return gender;
};

const parseParam = (param: unknown): string => {
    if (!isString(param)) {
        throw new Error("Incorrect param: " + param);
    }

    return param;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error("Incorrect or missing data");
    }

    if ('name' in object && 'dataOfBirth' in object && 'occupation' in object
        && 'gender' in object && 'ssn' in object) {
        const newPatient: NewPatient = {
            name: parseParam(object.name),
            dateOfBirth: parseDate(object.dataOfBirth),
            gender: parseGender(object.gender),
            occupation: parseParam(object.occupation),
            ssn: parseParam(object.ssn)
        };

        return newPatient;
    }

    throw new Error("Incorrect data");
};

export default toNewPatient;
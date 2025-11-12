import { PatientCase } from './patient.case.entity';
export declare class Staff {
    id: string;
    firstName: string;
    lastName: string;
    telephone: string;
    email: string;
    speciality: string;
    patientCase: PatientCase;
    password: string;
    role: 'admin' | 'nurse';
    createdAt: Date;
}

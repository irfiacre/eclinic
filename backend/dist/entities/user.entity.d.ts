import { PatientCase } from './patient.case.entity';
export declare class User {
    id: string;
    nationalId: string;
    telephone: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    patientCase: PatientCase;
}

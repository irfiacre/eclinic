import { PatientCase } from './patient.case.entity';
export declare class PatientInformation {
    id: string;
    patientCase: PatientCase;
    painScale: string;
    painLocation: string;
    days: string;
    chronicDisease: string;
    note: string;
    recommendation: string;
    createdAt: Date;
}

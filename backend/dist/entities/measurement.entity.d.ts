import { PatientCase } from './patient.case.entity';
export declare class Measurement {
    id: string;
    patientCase: PatientCase;
    temperature: number;
    bloodPressure: number;
    weight: number;
    height: number;
    respirations: number;
    createdAt: Date;
}

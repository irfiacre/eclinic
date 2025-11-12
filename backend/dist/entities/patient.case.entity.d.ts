import { User } from './user.entity';
import { PatientInformation } from './patient.information.entity';
import { Measurement } from './measurement.entity';
import { Staff } from './staff.entity';
export declare class PatientCase {
    id: string;
    status: 'pending' | 'served';
    decision: string;
    priority: 'critical' | 'moderate' | 'average' | 'safe';
    createdAt: Date;
    patient: User;
    patientInformation: PatientInformation;
    patientMeasurement: Measurement;
    assignedNurse: Staff;
}

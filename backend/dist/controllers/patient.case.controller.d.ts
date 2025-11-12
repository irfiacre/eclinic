import { PatientCase } from 'src/entities/patient.case.entity';
import { PatientCaseService } from 'src/services/patient.case.service';
export declare class PatientCaseController {
    private readonly patientCaseService;
    constructor(patientCaseService: PatientCaseService);
    create(data: Partial<PatientCase>): Promise<PatientCase>;
    findAll(): Promise<PatientCase[]>;
    findOne(id: string): Promise<PatientCase>;
    update(id: string, data: Partial<PatientCase>): Promise<PatientCase>;
    remove(id: string): Promise<void>;
}

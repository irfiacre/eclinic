import { PatientCase } from 'src/entities/patient.case.entity';
import { Repository } from 'typeorm';
export declare class PatientCaseService {
    private readonly patientCaseRepository;
    constructor(patientCaseRepository: Repository<PatientCase>);
    create(data: Partial<PatientCase>): Promise<PatientCase>;
    findAll(): Promise<PatientCase[]>;
    findOne(id: string): Promise<PatientCase>;
    findOneByCondition(condition: object): Promise<PatientCase | null>;
    update(id: string, data: Partial<PatientCase>): Promise<PatientCase>;
    remove(id: string): Promise<void>;
    handleUpdatePatientCasePriority(patientCase: PatientCase): Promise<PatientCase>;
}

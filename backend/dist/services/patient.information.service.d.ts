import { Repository } from 'typeorm';
import { PatientInformation } from '../entities/patient.information.entity';
export declare class PatientInformationService {
    private readonly patientInformationRepository;
    constructor(patientInformationRepository: Repository<PatientInformation>);
    create(data: Partial<PatientInformation>): Promise<PatientInformation>;
    findAll(): Promise<PatientInformation[]>;
    findOne(id: string): Promise<PatientInformation>;
    update(id: string, data: Partial<PatientInformation>): Promise<PatientInformation>;
    remove(id: string): Promise<void>;
}

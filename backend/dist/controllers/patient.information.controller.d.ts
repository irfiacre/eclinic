import { PatientInformation } from 'src/entities/patient.information.entity';
import { PatientInformationService } from 'src/services/patient.information.service';
export declare class PatientInformationController {
    private readonly patientInformationService;
    constructor(patientInformationService: PatientInformationService);
    create(data: Partial<PatientInformation>): Promise<PatientInformation>;
    findAll(): Promise<PatientInformation[]>;
    findOne(id: string): Promise<PatientInformation>;
    update(id: string, data: Partial<PatientInformation>): Promise<PatientInformation>;
    remove(id: string): Promise<void>;
}

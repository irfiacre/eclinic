import { Repository } from 'typeorm';
import { PatientInformation } from 'src/entities/patient.information.entity';
import { User } from 'src/entities/user.entity';
import { PatientCaseService } from 'src/services/patient.case.service';
import { PatientCase } from 'src/entities/patient.case.entity';
export declare class UsersService {
    private readonly usersRepository;
    private readonly patientInformationRepository;
    private readonly patientCaseService;
    constructor(usersRepository: Repository<User>, patientInformationRepository: Repository<PatientInformation>, patientCaseService: PatientCaseService);
    create(data: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(telephone: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
    handlePatientInformation(patientCase: PatientCase, text: string): Promise<string>;
    handleUssd(phoneNumber: string, text: string): Promise<string>;
}

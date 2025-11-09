import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientCase } from 'src/entities/patient.case.entity';
// import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientCaseService {
  constructor(
    @InjectRepository(PatientCase)
    private readonly patientCaseRepository: Repository<PatientCase>,
  ) {}

  async create(data: Partial<PatientCase>): Promise<PatientCase> {
    const patientCase = this.patientCaseRepository.create(data);
    return await this.patientCaseRepository.save(patientCase);
  }

  async findAll(): Promise<PatientCase[]> {
    return await this.patientCaseRepository.find({
      relations: ['patient', 'patientInformation'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PatientCase> {
    const patientCase = await this.patientCaseRepository.findOne({
      where: { id },
      relations: [
        'patient',
        'patientInformation',
        'patientMeasurement',
        'assignedNurse',
      ],
    });

    if (!patientCase) {
      throw new NotFoundException(`PatientCase with ID ${id} not found`);
    }

    return patientCase;
  }

  async findOneByCondition(condition: object): Promise<PatientCase | null> {
    const patientCase = await this.patientCaseRepository.findOne({
      where: condition,
      relations: [
        'patient',
        'patientInformation',
        'patientMeasurement',
        'assignedNurse',
      ],
    });

    return patientCase;
  }

  async update(id: string, data: Partial<PatientCase>): Promise<PatientCase> {
    const patientCase = await this.findOne(id);
    Object.assign(patientCase, data);
    return await this.patientCaseRepository.save(patientCase);
  }

  async remove(id: string): Promise<void> {
    const result = await this.patientCaseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`PatientCase with ID ${id} not found`);
    }
  }

  async handleUpdatePatientCasePriority(
    patientCase: PatientCase,
  ): Promise<PatientCase> {
    let priority: 'critical' | 'moderate' | 'average' = 'average';
    if (
      parseInt(patientCase.patientInformation.painScale) > 7 &&
      parseInt(patientCase.patientInformation.days) > 2
    ) {
      priority = 'critical';
    } else if (
      parseInt(patientCase.patientInformation.painScale) > 5 &&
      patientCase.patientInformation.chronicDisease
    ) {
      priority = 'moderate';
    }

    await this.update(patientCase.id, { priority });

    return patientCase;
  }
}

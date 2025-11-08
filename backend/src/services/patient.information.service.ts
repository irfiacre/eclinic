import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientInformation } from '../entities/patient.information.entity';

@Injectable()
export class PatientInformationService {
  constructor(
    @InjectRepository(PatientInformation)
    private readonly patientInformationRepository: Repository<PatientInformation>,
  ) {}

  async create(data: Partial<PatientInformation>): Promise<PatientInformation> {
    const patientInfo = this.patientInformationRepository.create(data);
    return await this.patientInformationRepository.save(patientInfo);
  }

  async findAll(): Promise<PatientInformation[]> {
    return await this.patientInformationRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PatientInformation> {
    const patientInfo = await this.patientInformationRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!patientInfo) {
      throw new NotFoundException(`PatientInformation with ID ${id} not found`);
    }

    return patientInfo;
  }

  async update(
    id: string,
    data: Partial<PatientInformation>,
  ): Promise<PatientInformation> {
    const patientInfo = await this.findOne(id);
    Object.assign(patientInfo, data);
    return await this.patientInformationRepository.save(patientInfo);
  }

  async remove(id: string): Promise<void> {
    const result = await this.patientInformationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`PatientInformation with ID ${id} not found`);
    }
  }
}

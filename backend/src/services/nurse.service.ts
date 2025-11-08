import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurement } from '../entities/measurement.entity';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
  ) {}

  async create(data: Partial<Measurement>): Promise<Measurement> {
    const measurement = this.measurementRepository.create(data);
    return await this.measurementRepository.save(measurement);
  }

  async findAll(): Promise<Measurement[]> {
    return await this.measurementRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Measurement> {
    const measurement = await this.measurementRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!measurement) {
      throw new NotFoundException(`Measurement with ID ${id} not found`);
    }

    return measurement;
  }

  async update(id: string, data: Partial<Measurement>): Promise<Measurement> {
    const measurement = await this.findOne(id);
    Object.assign(measurement, data);
    return await this.measurementRepository.save(measurement);
  }

  async remove(id: string): Promise<void> {
    const result = await this.measurementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Measurement with ID ${id} not found`);
    }
  }
}

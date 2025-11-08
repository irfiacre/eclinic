import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nurse } from '../entities/nurse.entity';

@Injectable()
export class NurseService {
  constructor(
    @InjectRepository(Nurse)
    private readonly nurseRepository: Repository<Nurse>,
  ) {}

  async create(data: Partial<Nurse>): Promise<Nurse> {
    const nurse = this.nurseRepository.create(data);
    return await this.nurseRepository.save(nurse);
  }

  async findAll(): Promise<Nurse[]> {
    return await this.nurseRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Nurse> {
    const nurse = await this.nurseRepository.findOne({ where: { id } });
    if (!nurse) {
      throw new NotFoundException(`Nurse with ID ${id} not found`);
    }
    return nurse;
  }

  async update(id: string, data: Partial<Nurse>): Promise<Nurse> {
    const nurse = await this.findOne(id);
    Object.assign(nurse, data);
    return await this.nurseRepository.save(nurse);
  }

  async remove(id: string): Promise<void> {
    const result = await this.nurseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Nurse with ID ${id} not found`);
    }
  }
}

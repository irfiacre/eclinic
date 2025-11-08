/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Decision } from '../entities/decision.entity';
import { User } from '../entities/user.entity';
import { Nurse } from '../entities/nurse.entity';

@Injectable()
export class DecisionService {
  constructor(
    @InjectRepository(Decision)
    private readonly decisionRepository: Repository<Decision>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Nurse)
    private readonly nurseRepository: Repository<Nurse>,
  ) {}

  async create(data: Partial<Decision>): Promise<Decision> {
    const decision = this.decisionRepository.create(data);
    return await this.decisionRepository.save(decision);
  }

  async findAll(): Promise<Decision[]> {
    return await this.decisionRepository.find({
      relations: ['user', 'nurse'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Decision> {
    const decision = await this.decisionRepository.findOne({
      where: { id },
      relations: ['user', 'nurse'],
    });

    if (!decision) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }

    return decision;
  }

  async update(id: string, data: Partial<Decision>): Promise<Decision> {
    const decision = await this.findOne(id);

    // If user or nurse IDs are provided, resolve them
    if (data.user && typeof data.user === 'string') {
      const user = await this.userRepository.findOne({
        where: { id: data.user },
      });
      if (!user)
        throw new NotFoundException(`User with ID ${data.user} not found`);
      decision.user = user;
    }

    if (data.nurse && typeof data.nurse === 'string') {
      const nurse = await this.nurseRepository.findOne({
        where: { id: data.nurse },
      });
      if (!nurse)
        throw new NotFoundException(`Nurse with ID ${data.nurse} not found`);
      decision.nurse = nurse;
    }

    Object.assign(decision, data);
    return await this.decisionRepository.save(decision);
  }

  async remove(id: string): Promise<void> {
    const result = await this.decisionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
  }
}

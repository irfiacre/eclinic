import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'src/entities/queue.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
  ) {}

  async create(data: Partial<Queue>): Promise<Queue> {
    const queue = this.queueRepository.create(data);
    return await this.queueRepository.save(queue);
  }

  async findAll(): Promise<Queue[]> {
    return await this.queueRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Queue> {
    const queue = await this.queueRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!queue) {
      throw new NotFoundException(`Queue with ID ${id} not found`);
    }

    return queue;
  }

  async update(id: string, data: Partial<Queue>): Promise<Queue> {
    const queue = await this.findOne(id);
    Object.assign(queue, data);
    return await this.queueRepository.save(queue);
  }

  async remove(id: string): Promise<void> {
    const result = await this.queueRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Queue with ID ${id} not found`);
    }
  }

  async handleAddUserToQueue(user: User): Promise<Queue> {
    let priority: 'critical' | 'moderate' | 'average' = 'average';
    if (
      parseInt(user.patientInformation.painScale) > 7 &&
      parseInt(user.patientInformation.days) > 2
    ) {
      priority = 'critical';
    } else if (
      parseInt(user.patientInformation.painScale) > 5 &&
      user.patientInformation.chronicDisease
    ) {
      priority = 'moderate';
    }

    const queue = await this.create({
      user,
      priority,
    });

    return queue;
  }
}

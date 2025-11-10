import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: Partial<Staff>): Promise<Staff> {
    const staff = this.staffRepository.create(data);
    return await this.staffRepository.save(staff);
  }

  async findAll(): Promise<Staff[]> {
    return await this.staffRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Staff> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return staff;
  }

  async update(id: string, data: Partial<Staff>): Promise<Staff> {
    const staff = await this.findOne(id);
    Object.assign(staff, data);
    return await this.staffRepository.save(staff);
  }

  async remove(id: string): Promise<void> {
    const result = await this.staffRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const staff = await this.staffRepository.findOne({ where: { email } });
    if (!staff) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(password, staff.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: staff.id,
      nurse: staff,
    };

    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}

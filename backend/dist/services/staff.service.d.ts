import { Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';
import { JwtService } from '@nestjs/jwt';
export declare class StaffService {
    private readonly staffRepository;
    private readonly jwtService;
    constructor(staffRepository: Repository<Staff>, jwtService: JwtService);
    create(data: Partial<Staff>): Promise<Staff>;
    findAll(): Promise<Staff[]>;
    findOne(id: string): Promise<Staff>;
    update(id: string, data: Partial<Staff>): Promise<Staff>;
    remove(id: string): Promise<void>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
}

import { Staff } from 'src/entities/staff.entity';
import { StaffService } from 'src/services/staff.service';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    create(data: Partial<Staff>): Promise<Staff>;
    findAll(): Promise<Staff[]>;
    findOne(id: string): Promise<Staff>;
    update(id: string, data: Partial<Staff>): Promise<Staff>;
    remove(id: string): Promise<void>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
}

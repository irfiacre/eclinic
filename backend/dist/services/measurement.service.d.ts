import { Repository } from 'typeorm';
import { Measurement } from '../entities/measurement.entity';
export declare class MeasurementService {
    private readonly measurementRepository;
    constructor(measurementRepository: Repository<Measurement>);
    create(data: Partial<Measurement>): Promise<Measurement>;
    findAll(): Promise<Measurement[]>;
    findOne(id: string): Promise<Measurement>;
    update(id: string, data: Partial<Measurement>): Promise<Measurement>;
    remove(id: string): Promise<void>;
}

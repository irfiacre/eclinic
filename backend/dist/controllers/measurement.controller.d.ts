import { Measurement } from 'src/entities/measurement.entity';
import { MeasurementService } from 'src/services/measurement.service';
export declare class MeasurementController {
    private readonly measurementService;
    constructor(measurementService: MeasurementService);
    create(data: Partial<Measurement>): Promise<Measurement>;
    findAll(): Promise<Measurement[]>;
    findOne(id: string): Promise<Measurement>;
    update(id: string, data: Partial<Measurement>): Promise<Measurement>;
    remove(id: string): Promise<void>;
}

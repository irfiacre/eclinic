"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const measurement_entity_1 = require("../entities/measurement.entity");
let MeasurementService = class MeasurementService {
    measurementRepository;
    constructor(measurementRepository) {
        this.measurementRepository = measurementRepository;
    }
    async create(data) {
        const measurement = this.measurementRepository.create(data);
        return await this.measurementRepository.save(measurement);
    }
    async findAll() {
        return await this.measurementRepository.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const measurement = await this.measurementRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!measurement) {
            throw new common_1.NotFoundException(`Measurement with ID ${id} not found`);
        }
        return measurement;
    }
    async update(id, data) {
        const measurement = await this.findOne(id);
        Object.assign(measurement, data);
        return await this.measurementRepository.save(measurement);
    }
    async remove(id) {
        const result = await this.measurementRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Measurement with ID ${id} not found`);
        }
    }
};
exports.MeasurementService = MeasurementService;
exports.MeasurementService = MeasurementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(measurement_entity_1.Measurement)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MeasurementService);
//# sourceMappingURL=measurement.service.js.map
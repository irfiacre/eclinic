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
exports.PatientInformationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_information_entity_1 = require("../entities/patient.information.entity");
let PatientInformationService = class PatientInformationService {
    patientInformationRepository;
    constructor(patientInformationRepository) {
        this.patientInformationRepository = patientInformationRepository;
    }
    async create(data) {
        const patientInfo = this.patientInformationRepository.create(data);
        return await this.patientInformationRepository.save(patientInfo);
    }
    async findAll() {
        return await this.patientInformationRepository.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const patientInfo = await this.patientInformationRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!patientInfo) {
            throw new common_1.NotFoundException(`PatientInformation with ID ${id} not found`);
        }
        return patientInfo;
    }
    async update(id, data) {
        const patientInfo = await this.findOne(id);
        Object.assign(patientInfo, data);
        return await this.patientInformationRepository.save(patientInfo);
    }
    async remove(id) {
        const result = await this.patientInformationRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`PatientInformation with ID ${id} not found`);
        }
    }
};
exports.PatientInformationService = PatientInformationService;
exports.PatientInformationService = PatientInformationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_information_entity_1.PatientInformation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PatientInformationService);
//# sourceMappingURL=patient.information.service.js.map
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
exports.PatientCaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const patient_case_entity_1 = require("../entities/patient.case.entity");
const typeorm_2 = require("typeorm");
let PatientCaseService = class PatientCaseService {
    patientCaseRepository;
    constructor(patientCaseRepository) {
        this.patientCaseRepository = patientCaseRepository;
    }
    async create(data) {
        const patientCase = this.patientCaseRepository.create(data);
        return await this.patientCaseRepository.save(patientCase);
    }
    async findAll() {
        return await this.patientCaseRepository.find({
            relations: ['patient', 'patientInformation'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const patientCase = await this.patientCaseRepository.findOne({
            where: { id },
            relations: [
                'patient',
                'patientInformation',
                'patientMeasurement',
                'assignedNurse',
            ],
        });
        if (!patientCase) {
            throw new common_1.NotFoundException(`PatientCase with ID ${id} not found`);
        }
        return patientCase;
    }
    async findOneByCondition(condition) {
        const patientCase = await this.patientCaseRepository.findOne({
            where: condition,
            relations: [
                'patient',
                'patientInformation',
                'patientMeasurement',
                'assignedNurse',
            ],
        });
        return patientCase;
    }
    async update(id, data) {
        const patientCase = await this.findOne(id);
        Object.assign(patientCase, data);
        return await this.patientCaseRepository.save(patientCase);
    }
    async remove(id) {
        const result = await this.patientCaseRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`PatientCase with ID ${id} not found`);
        }
    }
    async handleUpdatePatientCasePriority(patientCase) {
        let priority = 'average';
        if (parseInt(patientCase.patientInformation.painScale) > 7 &&
            parseInt(patientCase.patientInformation.days) > 2) {
            priority = 'critical';
        }
        else if (parseInt(patientCase.patientInformation.painScale) > 5 &&
            patientCase.patientInformation.chronicDisease) {
            priority = 'moderate';
        }
        await this.update(patientCase.id, { priority });
        return patientCase;
    }
};
exports.PatientCaseService = PatientCaseService;
exports.PatientCaseService = PatientCaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_case_entity_1.PatientCase)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PatientCaseService);
//# sourceMappingURL=patient.case.service.js.map
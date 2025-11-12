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
exports.PatientInformationController = void 0;
const common_1 = require("@nestjs/common");
const patient_information_service_1 = require("../services/patient.information.service");
let PatientInformationController = class PatientInformationController {
    patientInformationService;
    constructor(patientInformationService) {
        this.patientInformationService = patientInformationService;
    }
    create(data) {
        return this.patientInformationService.create(data);
    }
    findAll() {
        return this.patientInformationService.findAll();
    }
    findOne(id) {
        return this.patientInformationService.findOne(id);
    }
    update(id, data) {
        return this.patientInformationService.update(id, data);
    }
    remove(id) {
        return this.patientInformationService.remove(id);
    }
};
exports.PatientInformationController = PatientInformationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientInformationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientInformationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientInformationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PatientInformationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientInformationController.prototype, "remove", null);
exports.PatientInformationController = PatientInformationController = __decorate([
    (0, common_1.Controller)('patient-information'),
    __metadata("design:paramtypes", [patient_information_service_1.PatientInformationService])
], PatientInformationController);
//# sourceMappingURL=patient.information.controller.js.map
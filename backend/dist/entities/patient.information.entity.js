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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientInformation = void 0;
const typeorm_1 = require("typeorm");
const patient_case_entity_1 = require("./patient.case.entity");
let PatientInformation = class PatientInformation {
    id;
    patientCase;
    painScale;
    painLocation;
    days;
    chronicDisease;
    note;
    recommendation;
    createdAt;
};
exports.PatientInformation = PatientInformation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PatientInformation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => patient_case_entity_1.PatientCase, (caseEntity) => caseEntity.patientInformation),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", patient_case_entity_1.PatientCase)
], PatientInformation.prototype, "patientCase", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], PatientInformation.prototype, "painScale", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], PatientInformation.prototype, "painLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], PatientInformation.prototype, "days", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], PatientInformation.prototype, "chronicDisease", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], PatientInformation.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], PatientInformation.prototype, "recommendation", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], PatientInformation.prototype, "createdAt", void 0);
exports.PatientInformation = PatientInformation = __decorate([
    (0, typeorm_1.Entity)()
], PatientInformation);
//# sourceMappingURL=patient.information.entity.js.map
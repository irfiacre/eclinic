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
exports.Measurement = void 0;
const typeorm_1 = require("typeorm");
const patient_case_entity_1 = require("./patient.case.entity");
let Measurement = class Measurement {
    id;
    patientCase;
    temperature;
    bloodPressure;
    weight;
    height;
    respirations;
    createdAt;
};
exports.Measurement = Measurement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Measurement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => patient_case_entity_1.PatientCase, (caseEntity) => caseEntity.patientMeasurement),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", patient_case_entity_1.PatientCase)
], Measurement.prototype, "patientCase", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Measurement.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Measurement.prototype, "bloodPressure", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Measurement.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Measurement.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Measurement.prototype, "respirations", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Measurement.prototype, "createdAt", void 0);
exports.Measurement = Measurement = __decorate([
    (0, typeorm_1.Entity)()
], Measurement);
//# sourceMappingURL=measurement.entity.js.map
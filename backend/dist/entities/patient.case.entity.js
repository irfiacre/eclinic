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
exports.PatientCase = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const patient_information_entity_1 = require("./patient.information.entity");
const measurement_entity_1 = require("./measurement.entity");
const staff_entity_1 = require("./staff.entity");
let PatientCase = class PatientCase {
    id;
    status;
    decision;
    priority;
    createdAt;
    patient;
    patientInformation;
    patientMeasurement;
    assignedNurse;
};
exports.PatientCase = PatientCase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PatientCase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'served'],
        default: 'pending',
    }),
    __metadata("design:type", String)
], PatientCase.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], PatientCase.prototype, "decision", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['critical', 'moderate', 'average', 'safe'],
        default: 'average',
    }),
    __metadata("design:type", String)
], PatientCase.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], PatientCase.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.patientCase),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], PatientCase.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => patient_information_entity_1.PatientInformation, (patientInformation) => patientInformation.patientCase),
    __metadata("design:type", patient_information_entity_1.PatientInformation)
], PatientCase.prototype, "patientInformation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => measurement_entity_1.Measurement, (patientMeasurement) => patientMeasurement.patientCase),
    __metadata("design:type", measurement_entity_1.Measurement)
], PatientCase.prototype, "patientMeasurement", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => staff_entity_1.Staff, (nurse) => nurse.patientCase),
    __metadata("design:type", staff_entity_1.Staff)
], PatientCase.prototype, "assignedNurse", void 0);
exports.PatientCase = PatientCase = __decorate([
    (0, typeorm_1.Entity)()
], PatientCase);
//# sourceMappingURL=patient.case.entity.js.map
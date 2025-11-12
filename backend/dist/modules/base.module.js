"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../entities/user.entity");
const user_controller_1 = require("../controllers/user.controller");
const user_service_1 = require("../services/user.service");
const measurement_entity_1 = require("../entities/measurement.entity");
const patient_information_entity_1 = require("../entities/patient.information.entity");
const measurement_service_1 = require("../services/measurement.service");
const measurement_controller_1 = require("../controllers/measurement.controller");
const patient_case_entity_1 = require("../entities/patient.case.entity");
const patient_case_service_1 = require("../services/patient.case.service");
const patient_case_controller_1 = require("../controllers/patient.case.controller");
const staff_entity_1 = require("../entities/staff.entity");
const staff_controller_1 = require("../controllers/staff.controller");
const staff_service_1 = require("../services/staff.service");
let BaseModule = class BaseModule {
};
exports.BaseModule = BaseModule;
exports.BaseModule = BaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                measurement_entity_1.Measurement,
                patient_information_entity_1.PatientInformation,
                patient_case_entity_1.PatientCase,
                staff_entity_1.Staff,
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret_key',
                signOptions: { expiresIn: '1w' },
            }),
        ],
        controllers: [
            user_controller_1.UsersController,
            measurement_controller_1.MeasurementController,
            patient_case_controller_1.PatientCaseController,
            staff_controller_1.StaffController,
        ],
        providers: [
            user_service_1.UsersService,
            measurement_service_1.MeasurementService,
            patient_case_service_1.PatientCaseService,
            staff_service_1.StaffService,
        ],
        exports: [user_service_1.UsersService, measurement_service_1.MeasurementService, patient_case_service_1.PatientCaseService, staff_service_1.StaffService],
    })
], BaseModule);
//# sourceMappingURL=base.module.js.map
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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_information_entity_1 = require("../entities/patient.information.entity");
const user_entity_1 = require("../entities/user.entity");
const patient_case_service_1 = require("./patient.case.service");
const helpers_1 = require("../utils/helpers");
let UsersService = class UsersService {
    usersRepository;
    patientInformationRepository;
    patientCaseService;
    constructor(usersRepository, patientInformationRepository, patientCaseService) {
        this.usersRepository = usersRepository;
        this.patientInformationRepository = patientInformationRepository;
        this.patientCaseService = patientCaseService;
    }
    async create(data) {
        const user = this.usersRepository.create(data);
        return await this.usersRepository.save(user);
    }
    async findAll() {
        return await this.usersRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(telephone) {
        const user = await this.usersRepository.findOne({
            where: { telephone },
            relations: ['patientCase'],
        });
        return user;
    }
    async update(id, data) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        Object.assign(user, data);
        return await this.usersRepository.save(user);
    }
    async remove(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
    }
    async handlePatientInformation(patientCase, text) {
        let patientInformation = patientCase?.patientInformation;
        if (!patientInformation) {
            patientInformation = await this.patientInformationRepository.save(this.patientInformationRepository.create({
                patientCase: patientCase,
            }));
        }
        let response;
        if (!patientInformation.painScale) {
            const choice = parseInt(text);
            if (choice >= 1 && choice <= 10) {
                Object.assign(patientInformation, { painScale: choice });
                await this.patientInformationRepository.save(patientInformation);
                response = await this.handlePatientInformation(patientCase, text);
            }
            else {
                response =
                    'CON Mutubwire igipimo cyububabare mufite ububabare (hitamo hagati ya 1 kugeza 10)';
            }
        }
        else if (!patientInformation.painLocation) {
            if (text.length === 1 && ['a', 'b', 'c', 'n'].includes(text)) {
                Object.assign(patientInformation, {
                    painLocation: text === 'a'
                        ? 'head'
                        : text === 'b'
                            ? 'stomach'
                            : text === 'c'
                                ? 'chest'
                                : '',
                });
                await this.patientInformationRepository.save(patientInformation);
                response = await this.handlePatientInformation(patientCase, text);
            }
            else {
                response =
                    'CON Andika nimero yumubare ujyane naho ubabara: \na. Umutwe\nb. Munda\nc. Mugituza\nn. Ntaho';
            }
        }
        else if (!patientInformation.days) {
            const choice = parseInt(text);
            if (choice >= 0) {
                Object.assign(patientInformation, { days: choice });
                await this.patientInformationRepository.save(patientInformation);
                response = await this.handlePatientInformation(patientCase, text);
            }
            else {
                return 'CON Andika umubare wiminsi umaze urwaye';
            }
        }
        else if (!patientInformation.chronicDisease) {
            if (text.length === 1 && ['d', 'u', 'a', 'n'].includes(text)) {
                Object.assign(patientInformation, {
                    chronicDisease: text === 'n'
                        ? ''
                        : text === 'd'
                            ? 'diabetes'
                            : text === 'u'
                                ? 'high blood pressure'
                                : 'asthma',
                });
                await this.patientInformationRepository.save(patientInformation);
                response = await this.handlePatientInformation(patientCase, text);
            }
            else {
                return 'CON Hari indwara zidakira mufite\nd. Diabete\na. Asthma\nu. Umuvuduko wamaraso\nn. Ntayo';
            }
        }
        else if (!patientInformation.note) {
            if (typeof text === 'string' && text.length >= 4) {
                Object.assign(patientInformation, { note: text });
                await this.patientInformationRepository.save(patientInformation);
                response = await this.handlePatientInformation(patientCase, text);
            }
            else {
                return 'CON Duhe and makuru';
            }
        }
        else {
            response = 'END Murakoze';
        }
        return response;
    }
    async handleUssd(phoneNumber, text) {
        try {
            let userFound = await this.findOne(phoneNumber);
            if (!userFound) {
                if (!text) {
                    return `CON Shyiramo nimero yirangamuntu`;
                }
                if (text.length === 16) {
                    const { firstName, lastName } = (0, helpers_1.mockNidaApi)();
                    await this.create({
                        nationalId: text,
                        telephone: phoneNumber,
                        firstName,
                        lastName,
                    });
                    userFound = await this.findOne(phoneNumber);
                    if (userFound) {
                        await this.patientCaseService.create({ patient: userFound });
                    }
                }
                else {
                    return 'END Andika irangamuntu neza';
                }
            }
            if (text && userFound) {
                const patientCase = await this.patientCaseService.findOneByCondition({
                    patient: userFound,
                });
                if (!patientCase) {
                    throw new common_1.NotFoundException(`Could Not find case for patient ${userFound.id}.`);
                }
                const result = await this.handlePatientInformation(patientCase, text);
                if (result && result.includes('CON')) {
                    return result;
                }
                await this.patientCaseService.handleUpdatePatientCasePriority(patientCase);
            }
            return `END Twakiriye neza case yanyu.\n Turaje tubafashe`;
        }
        catch (error) {
            console.error(error);
            return `END Mwongere mugerageze`;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(patient_information_entity_1.PatientInformation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        patient_case_service_1.PatientCaseService])
], UsersService);
//# sourceMappingURL=user.service.js.map
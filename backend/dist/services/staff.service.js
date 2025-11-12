"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_entity_1 = require("../entities/staff.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
let StaffService = class StaffService {
    staffRepository;
    jwtService;
    constructor(staffRepository, jwtService) {
        this.staffRepository = staffRepository;
        this.jwtService = jwtService;
    }
    async create(data) {
        const staff = this.staffRepository.create(data);
        return await this.staffRepository.save(staff);
    }
    async findAll() {
        return await this.staffRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const staff = await this.staffRepository.findOne({ where: { id } });
        if (!staff) {
            throw new common_1.NotFoundException(`Staff with ID ${id} not found`);
        }
        return staff;
    }
    async update(id, data) {
        const staff = await this.findOne(id);
        Object.assign(staff, data);
        return await this.staffRepository.save(staff);
    }
    async remove(id) {
        const result = await this.staffRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Staff with ID ${id} not found`);
        }
    }
    async login(email, password) {
        const staff = await this.staffRepository.findOne({ where: { email } });
        if (!staff)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const passwordMatch = await bcrypt.compare(password, staff.password);
        if (!passwordMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = {
            sub: staff.id,
            nurse: staff,
        };
        const token = await this.jwtService.signAsync(payload);
        return { token };
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], StaffService);
//# sourceMappingURL=staff.service.js.map
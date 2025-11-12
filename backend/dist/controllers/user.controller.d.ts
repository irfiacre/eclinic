import { User } from '../entities/user.entity';
import { UsersService } from 'src/services/user.service';
import express from 'express';
export interface UssdDto {
    sessionId: string;
    serviceCode: string;
    phoneNumber: string;
    text: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    create(createUserDto: Partial<User>): Promise<User>;
    update(id: string, updateUserDto: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
    registerPatient(body: UssdDto, res: express.Response): Promise<any>;
}

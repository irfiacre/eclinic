/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from 'src/services/user.service';
import express from 'express';

export interface UssdDto {
  sessionId: string;
  serviceCode: string;
  phoneNumber: string;
  text: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: Partial<User>): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  @Post('/ussd')
  async registerPatient(
    @Body() body: UssdDto,
    @Res() res: express.Response,
  ): Promise<any> {
    const result = await this.usersService.handleUssd(
      body.phoneNumber,
      body.text,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.setHeader('Content-Type', 'text/plain');
    res.status(200);
    res.send(result);
  }
}

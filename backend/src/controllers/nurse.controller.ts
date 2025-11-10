import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Nurse } from 'src/entities/staff.entity';
import { NurseService } from 'src/services/nurse.service';

@Controller('nurse')
export class NurseController {
  constructor(private readonly measurementService: NurseService) {}

  @Post()
  create(@Body() data: Partial<Nurse>): Promise<Nurse> {
    return this.measurementService.create(data);
  }

  @Get()
  findAll(): Promise<Nurse[]> {
    return this.measurementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Nurse> {
    return this.measurementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Nurse>,
  ): Promise<Nurse> {
    return this.measurementService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.measurementService.remove(id);
  }
}

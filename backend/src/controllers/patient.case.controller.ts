import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PatientCase } from 'src/entities/patient.case.entity';
import { PatientCaseService } from 'src/services/patient.case.service';

@Controller('patient-cases')
export class PatientCaseController {
  constructor(private readonly patientCaseService: PatientCaseService) {}

  @Post()
  create(@Body() data: Partial<PatientCase>): Promise<PatientCase> {
    return this.patientCaseService.create(data);
  }

  @Get()
  findAll(): Promise<PatientCase[]> {
    return this.patientCaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PatientCase> {
    return this.patientCaseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<PatientCase>,
  ): Promise<PatientCase> {
    return this.patientCaseService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientCaseService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PatientInformation } from 'src/entities/patient.information.entity';
import { PatientInformationService } from 'src/services/patient.information.service';

@Controller('patient-information')
export class PatientInformationController {
  constructor(
    private readonly patientInformationService: PatientInformationService,
  ) {}

  @Post()
  create(
    @Body() data: Partial<PatientInformation>,
  ): Promise<PatientInformation> {
    return this.patientInformationService.create(data);
  }

  @Get()
  findAll(): Promise<PatientInformation[]> {
    return this.patientInformationService.findAll();
  }

  @Get(':id')
  findOne(@Param(':id') id: string): Promise<PatientInformation> {
    return this.patientInformationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<PatientInformation>,
  ): Promise<PatientInformation> {
    return this.patientInformationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientInformationService.remove(id);
  }
}

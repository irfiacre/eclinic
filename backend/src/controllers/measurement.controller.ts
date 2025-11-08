import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Measurement } from 'src/entities/measurement.entity';
import { MeasurementService } from 'src/services/measurement.service';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post()
  create(@Body() data: Partial<Measurement>): Promise<Measurement> {
    return this.measurementService.create(data);
  }

  @Get()
  findAll(): Promise<Measurement[]> {
    return this.measurementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Measurement> {
    return this.measurementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Measurement>,
  ): Promise<Measurement> {
    return this.measurementService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.measurementService.remove(id);
  }
}

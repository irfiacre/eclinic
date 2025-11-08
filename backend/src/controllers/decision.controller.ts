import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Decision } from 'src/entities/decision.entity';
import { DecisionService } from 'src/services/decision.service';

@Controller('decision')
export class DecisionController {
  constructor(private readonly measurementService: DecisionService) {}

  @Post()
  create(@Body() data: Partial<Decision>): Promise<Decision> {
    return this.measurementService.create(data);
  }

  @Get()
  findAll(): Promise<Decision[]> {
    return this.measurementService.findAll();
  }

  @Get(':id')
  findOne(@Param(':id') id: string): Promise<Decision> {
    return this.measurementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Decision>,
  ): Promise<Decision> {
    return this.measurementService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.measurementService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Queue } from 'src/entities/queue.entity';
import { QueueService } from 'src/services/queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly measurementService: QueueService) {}

  @Post()
  create(@Body() data: Partial<Queue>): Promise<Queue> {
    return this.measurementService.create(data);
  }

  @Get()
  findAll(): Promise<Queue[]> {
    return this.measurementService.findAll();
  }

  @Get(':id')
  findOne(@Param(':id') id: string): Promise<Queue> {
    return this.measurementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Queue>,
  ): Promise<Queue> {
    return this.measurementService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.measurementService.remove(id);
  }
}

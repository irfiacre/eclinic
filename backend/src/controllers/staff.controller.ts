import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Staff } from 'src/entities/staff.entity';
import { StaffService } from 'src/services/staff.service';
import * as bcrypt from 'bcrypt';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() data: Partial<Staff>): Promise<Staff> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.staffService.create(data);
  }

  @Get()
  findAll(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Staff> {
    return this.staffService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Staff>,
  ): Promise<Staff> {
    return this.staffService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.staffService.remove(id);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.staffService.login(body.email, body.password);
  }
}

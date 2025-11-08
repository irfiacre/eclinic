/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { PatientInformation } from 'src/entities/patient.information.entity';
import { handleAddUserToQueue } from 'src/utils/helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(PatientInformation)
    private readonly patientInformationRepository: Repository<PatientInformation>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user: User = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      // relations: ['measurement', 'patientInformation'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(telephone: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { telephone },
      relations: ['patientInformation'],
    });

    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, data);
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result: DeleteResult = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async handleUssd(
    sessionId: string,
    serviceCode: string,
    phoneNumber: string,
    text: string,
  ): Promise<string> {
    try {
      const userFound: User | null = await this.findOne(phoneNumber);

      if (!userFound) {
        if (!text) {
          return `CON Shyiramo nimero yirangamuntu`;
        }
        // Validate the ID Provided
        if (text.length === 16) {
          await this.create({
            nationalId: text,
            telephone: phoneNumber,
          });
        }
      }

      const patientInformation = userFound?.patientInformation;

      if (text) {
        if (!patientInformation && userFound) {
          await this.patientInformationRepository.save(
            this.patientInformationRepository.create({
              user: userFound,
            }),
          );
        } else if (patientInformation) {
          console.log('======', patientInformation);
          if (!patientInformation.painScale) {
            const choice = parseInt(text);
            if (choice >= 1 && choice <= 10) {
              Object.assign(patientInformation, { painScale: choice });
              await this.patientInformationRepository.save(patientInformation);
            } else {
              return 'CON Mutubwire igipimo cyububabare mufite ububabare (hitamo hagati ya 1 kugeza 10)';
            }
          } else if (!patientInformation.painLocation) {
            const choice = parseInt(text);
            if (choice >= 1 && choice <= 3) {
              Object.assign(patientInformation, {
                painLocation:
                  choice === 1 ? 'head' : choice === 2 ? 'stomach' : 'chest',
              });
              await this.patientInformationRepository.save(patientInformation);
            } else {
              return 'CON Andika nimero yumubare ujyane naho ubabara: \n1. Umutwe\n2. Munda\n3. Mugituza';
            }
          } else if (!patientInformation.days) {
            const choice = parseInt(text);
            if (choice >= 0) {
              Object.assign(patientInformation, { days: choice });
              await this.patientInformationRepository.save(patientInformation);
            } else {
              return 'CON Andika umubare wiminsi umaze urwaye';
            }
          } else if (!patientInformation.chronicDisease) {
            const choice = parseInt(text);
            if (choice >= 1 && choice <= 4) {
              Object.assign(patientInformation, {
                chronicDisease:
                  choice === 1
                    ? 'diabetes'
                    : choice === 2
                      ? 'asthma'
                      : 'high blood pressure',
              });
              await this.patientInformationRepository.save(patientInformation);
            } else {
              return 'CON Hari indwara zidakira mufite\n1. Diabete\n2. Asthma\n3. Umuvuduko wamaraso';
            }
          } else if (!patientInformation.note) {
            if (text) {
              Object.assign(patientInformation, { note: text });
              await this.patientInformationRepository.save(patientInformation);
            } else {
              return 'CON Hari indwara zidakira mufite\n1. Diabete\n2. Asthma\n3. Umuvuduko wamaraso';
            }
          }
        }
      }
      const queueNumber = handleAddUserToQueue(patientInformation);
      // Add user to QUEUE
      // Add langchain agent to assign QUE
      return `END Nimero yanyu ni ${queueNumber} Murakoze Turaje tubafashe`;
    } catch (error) {
      console.error(error);
      return `END Mwongere mugerageze`;
    }
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { PatientInformation } from 'src/entities/patient.information.entity';
import { User } from 'src/entities/user.entity';
import { PatientCaseService } from 'src/services/patient.case.service';
import { mockNidaApi } from 'src/utils/helpers';
import { PatientCase } from 'src/entities/patient.case.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(PatientInformation)
    private readonly patientInformationRepository: Repository<PatientInformation>,

    private readonly patientCaseService: PatientCaseService,
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
      relations: ['patientCase'],
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

  async handlePatientInformation(
    patientCase: PatientCase,
    text: string,
  ): Promise<string> {
    // TODO: Remember to add validation on cases where a user adds "n" or wrong inputs.

    let patientInformation = patientCase?.patientInformation;

    if (!patientInformation) {
      patientInformation = await this.patientInformationRepository.save(
        this.patientInformationRepository.create({
          patientCase: patientCase,
        }),
      );
    }

    let response;

    console.log('========', patientCase);

    if (!patientInformation.painScale) {
      const choice = parseInt(text);
      if (choice >= 1 && choice <= 10) {
        Object.assign(patientInformation, { painScale: choice });
        await this.patientInformationRepository.save(patientInformation);
        response = await this.handlePatientInformation(patientCase, text);
      } else {
        response =
          'CON Mutubwire igipimo cyububabare mufite ububabare (hitamo hagati ya 1 kugeza 10)';
      }
    } else if (!patientInformation.painLocation) {
      if (text.length === 1 && ['a', 'b', 'c', 'n'].includes(text)) {
        Object.assign(patientInformation, {
          painLocation:
            text === 'a'
              ? 'head'
              : text === 'b'
                ? 'stomach'
                : text === 'c'
                  ? 'chest'
                  : '',
        });
        await this.patientInformationRepository.save(patientInformation);
        response = await this.handlePatientInformation(patientCase, text);
      } else {
        response =
          'CON Andika nimero yumubare ujyane naho ubabara: \na. Umutwe\nb. Munda\nc. Mugituza\nn. Ntaho';
      }
    } else if (!patientInformation.days) {
      const choice = parseInt(text);
      if (choice >= 0) {
        Object.assign(patientInformation, { days: choice });
        await this.patientInformationRepository.save(patientInformation);
        response = await this.handlePatientInformation(patientCase, text);
      } else {
        return 'CON Andika umubare wiminsi umaze urwaye';
      }
    } else if (!patientInformation.chronicDisease) {
      if (text.length === 1 && ['d', 'u', 'a', 'n'].includes(text)) {
        Object.assign(patientInformation, {
          chronicDisease:
            text === 'n'
              ? ''
              : text === 'd'
                ? 'diabetes'
                : text === 'u'
                  ? 'high blood pressure'
                  : 'asthma',
        });
        await this.patientInformationRepository.save(patientInformation);
        response = await this.handlePatientInformation(patientCase, text);
      } else {
        return 'CON Hari indwara zidakira mufite\nd. Diabete\na. Asthma\nu. Umuvuduko wamaraso\nn. Ntayo';
      }
    } else if (!patientInformation.note) {
      if (typeof text === 'string' && text.length >= 4) {
        Object.assign(patientInformation, { note: text });
        await this.patientInformationRepository.save(patientInformation);
        response = await this.handlePatientInformation(patientCase, text);
      } else {
        return 'CON Duhe and makuru';
      }
    } else {
      response = 'END Murakoze';
    }

    return response;
  }

  async handleUssd(phoneNumber: string, text: string): Promise<string> {
    console.log('-----------', phoneNumber, text);

    try {
      let userFound: User | null = await this.findOne(phoneNumber);

      if (!userFound) {
        if (!text) {
          return `CON Welcome to MUGANGA\nShyiramo nimero yirangamuntu`;
        }
        // Validate the ID Provided
        if (text.length === 16) {
          const { firstName, lastName } = mockNidaApi();
          await this.create({
            nationalId: text,
            telephone: phoneNumber,
            firstName,
            lastName,
          });
          userFound = await this.findOne(phoneNumber);
          if (userFound) {
            await this.patientCaseService.create({ patient: userFound });
          }
        } else {
          return 'END Andika irangamuntu neza';
        }
      }

      if (text && userFound) {
        const patientCase = await this.patientCaseService.findOneByCondition({
          patient: userFound,
        });
        if (!patientCase) {
          throw new NotFoundException(
            `Could Not find case for patient ${userFound.id}.`,
          );
        }
        const result = await this.handlePatientInformation(patientCase, text);
        if (result && result.includes('CON')) {
          return result;
        }

        await this.patientCaseService.handleUpdatePatientCasePriority(
          patientCase,
        );
      }

      return `END Twakiriye neza case yanyu.\n Turaje tubafashe`;
    } catch (error) {
      console.error(error);
      return `END Mwongere mugerageze`;
    }
  }
}

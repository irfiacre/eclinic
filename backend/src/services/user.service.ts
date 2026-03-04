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
    inputs: string[],
  ): Promise<string> {
    let patientInformation = patientCase?.patientInformation;

    if (!patientInformation) {
      patientInformation = await this.patientInformationRepository.save(
        this.patientInformationRepository.create({
          patientCase: patientCase,
        }),
      );
    }

    let step = 0;

    // --- Step: painScale ---
    if (!patientInformation.painScale) {
      const raw = inputs[step];
      if (raw === undefined) {
        return 'CON Mutubwire igipimo cyububabare mufite ububabare (hitamo hagati ya 1 kugeza 10)';
      }
      const choice = parseInt(raw);
      if (choice >= 1 && choice <= 10) {
        patientInformation.painScale = choice.toLocaleString();
        await this.patientInformationRepository.save(patientInformation);
      } else {
        return 'END Andika umubare uri hagati ya 1 na 10';
      }
      step++;
    }

    // --- Step: painLocation ---
    if (!patientInformation.painLocation) {
      const raw = inputs[step];
      if (raw === undefined) {
        return 'CON Andika nimero yumubare ujyane naho ubabara: \na. Umutwe\nb. Munda\nc. Mugituza\nn. Ntaho';
      }
      if (['a', 'b', 'c', 'n'].includes(raw)) {
        patientInformation.painLocation =
          raw === 'a'
            ? 'head'
            : raw === 'b'
              ? 'stomach'
              : raw === 'c'
                ? 'chest'
                : '';
        await this.patientInformationRepository.save(patientInformation);
      } else {
        return 'END Hitamo a, b, c, cyangwa n';
      }
      step++;
    }

    // --- Step: days ---
    if (!patientInformation.days) {
      const raw = inputs[step];
      if (raw === undefined) {
        return 'CON Andika umubare wiminsi umaze urwaye';
      }
      const choice = parseInt(raw);
      if (!isNaN(choice) && choice >= 0) {
        patientInformation.days = choice.toLocaleString();
        await this.patientInformationRepository.save(patientInformation);
      } else {
        return 'END Andika umubare wiminsi';
      }
      step++;
    }

    // --- Step: chronicDisease ---
    if (!patientInformation.chronicDisease) {
      const raw = inputs[step];
      if (raw === undefined) {
        return 'CON Hari indwara zidakira mufite\nd. Diabete\na. Asthma\nu. Umuvuduko wamaraso\nn. Ntayo';
      }
      if (['d', 'u', 'a', 'n'].includes(raw)) {
        patientInformation.chronicDisease =
          raw === 'n'
            ? ''
            : raw === 'd'
              ? 'diabetes'
              : raw === 'u'
                ? 'high blood pressure'
                : 'asthma';
        await this.patientInformationRepository.save(patientInformation);
      } else {
        return 'END Hitamo d, a, u, cyangwa n';
      }
      step++;
    }

    // --- Step: note ---
    if (!patientInformation.note) {
      const raw = inputs[step];
      if (raw === undefined) {
        return 'CON Duhe and makuru';
      }
      if (raw.length >= 4) {
        patientInformation.note = raw;
        await this.patientInformationRepository.save(patientInformation);
      } else {
        return 'END Andika byibura inyuguti 4';
      }
    }

    return 'END Murakoze';
  }

  async handleUssd(phoneNumber: string, text: string): Promise<string> {
    try {
      const inputs = text ? text.split('*') : [];
      let userFound: User | null = await this.findOne(phoneNumber);
      let isNewUser = false;

      if (!userFound) {
        if (inputs.length === 0) {
          return `CON Shyiramo nimero yirangamuntu`;
        }
        const nationalId = inputs[0];
        if (nationalId.length === 16) {
          const { firstName, lastName } = mockNidaApi();
          await this.create({
            nationalId,
            telephone: phoneNumber,
            firstName,
            lastName,
          });
          userFound = await this.findOne(phoneNumber);
          if (userFound) {
            await this.patientCaseService.create({ patient: userFound });
          }
          isNewUser = true;
        } else {
          return 'END Andika irangamuntu neza';
        }
      }

      if (userFound) {
        const patientCase = await this.patientCaseService.findOneByCondition({
          patient: userFound,
        });
        if (!patientCase) {
          throw new NotFoundException(
            `Could Not find case for patient ${userFound.id}.`,
          );
        }

        // Only skip the first input if the user registered in THIS session
        const patientInputs = isNewUser ? inputs.slice(1) : inputs;
        const result = await this.handlePatientInformation(
          patientCase,
          patientInputs,
        );
        if (result.includes('CON')) {
          return result;
        }

        await this.patientCaseService.handleUpdatePatientCasePriority(
          patientCase,
        );
      }

      return `END Twakiriye neza case yanyu!\n Turaje tubafashe`;
    } catch (error) {
      console.error(error);
      return `END Mwongere mugerageze`;
    }
  }
}

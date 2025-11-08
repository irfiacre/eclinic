/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { PatientInformation } from 'src/entities/patient.information.entity';
// import { handleAddUserToQueue } from 'src/utils/helpers';

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

  async handleUpdateUserPatientInformation(
    patientInformation: PatientInformation | null,
    userFound: User,
    text: string,
  ): Promise<string> {
    // TODO: Remember to add validation on cases where a user adds "n" or wrong inputs.
    if (!patientInformation) {
      patientInformation = await this.patientInformationRepository.save(
        this.patientInformationRepository.create({
          user: userFound,
        }),
      );
    }

    let response;

    if (!patientInformation.painScale) {
      const choice = parseInt(text);
      if (choice >= 1 && choice <= 10) {
        Object.assign(patientInformation, { painScale: choice });
        const updatedPatientInformation =
          await this.patientInformationRepository.save(patientInformation);

        response = await this.handleUpdateUserPatientInformation(
          updatedPatientInformation,
          userFound,
          text,
        );
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
        const updatedPatientInformation =
          await this.patientInformationRepository.save(patientInformation);
        response = await this.handleUpdateUserPatientInformation(
          updatedPatientInformation,
          userFound,
          text,
        );
      } else {
        response =
          'CON Andika nimero yumubare ujyane naho ubabara: \na. Umutwe\nb. Munda\nc. Mugituza\nn. Ntaho';
      }
    } else if (!patientInformation.days) {
      const choice = parseInt(text);
      if (choice >= 0) {
        Object.assign(patientInformation, { days: choice });
        const updatedPatientInformation =
          await this.patientInformationRepository.save(patientInformation);
        response = await this.handleUpdateUserPatientInformation(
          updatedPatientInformation,
          userFound,
          text,
        );
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

        const updatedPatientInformation =
          await this.patientInformationRepository.save(patientInformation);
        response = await this.handleUpdateUserPatientInformation(
          updatedPatientInformation,
          userFound,
          text,
        );
      } else {
        return 'CON Hari indwara zidakira mufite\nd. Diabete\na. Asthma\nu. Umuvuduko wamaraso\nn. Ntayo';
      }
    } else if (!patientInformation.note) {
      if (typeof text === 'string' && text.length >= 4) {
        Object.assign(patientInformation, { note: text });
        const updatedPatientInformation =
          await this.patientInformationRepository.save(patientInformation);
        response = await this.handleUpdateUserPatientInformation(
          updatedPatientInformation,
          userFound,
          text,
        );
      } else {
        return 'CON Duhe and makuru';
      }
    } else {
      response = 'END Murakoze';
    }

    return response;
  }

  async handleUssd(phoneNumber: string, text: string): Promise<string> {
    try {
      let userFound: User | null = await this.findOne(phoneNumber);

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
          userFound = await this.findOne(phoneNumber);
        } else {
          return 'END Andika irangamuntu neza';
        }
      }
      let queueNumber;
      if (text && userFound) {
        const result = await this.handleUpdateUserPatientInformation(
          userFound.patientInformation,
          userFound,
          text,
        );
        console.log('>>>>>>>>', result);
        if (result && result.includes('CON')) {
          return result;
        }
        // queueNumber = handleAddUserToQueue(userFound.patientInformation);
      }

      // Add user to QUEUE
      // Add langchain agent to assign QUE
      return `END Nimero yanyu ni ${queueNumber} Murakoze Turaje tubafashe`;
    } catch (error) {
      console.error(error);
      return `END Mwongere mugerageze`;
    }
  }
}

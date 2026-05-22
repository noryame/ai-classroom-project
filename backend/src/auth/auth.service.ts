import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) {}

  async signup(data: any) {
    const existingUser =
  await this.prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

if (existingUser) {

  return {
    message:
      'Cet email existe déjà',
  };
}
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        profilePhoto: data.profilePhoto,
      },
    });

    return {
      message: 'Utilisateur créé',
      user,
    };
  }

  async login(data: any) {

    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        message: 'Utilisateur introuvable',
      };
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!passwordMatches) {
      return {
        message: 'Mot de passe incorrect',
      };
    }

    return {
      message: 'Connexion réussie',
      user,
    };
  }
async saveAttendance(data: any) {

  const attendance =
    await this.prisma.attendance.create({

      data: {

        attentionScore:
          data.attentionScore,

        present:
          data.present,

        studentId:
          data.studentId,
      },
    });

  return attendance;
}
async getAttendances() {

  return this.prisma.attendance.findMany({

  orderBy: {
    createdAt: "desc",
  },

  include: {
    student: true,
  },
});
}
}
import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { FileInterceptor }
from '@nestjs/platform-express';

import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() body: any) {

    return this.authService
      .signup(body);
  }

  @Post('login')
  login(@Body() body: any) {

    return this.authService
      .login(body);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {

      storage: diskStorage({

        destination: './uploads',

        filename: (
          req,
          file,
          cb,
        ) => {

          const uniqueName =
            Date.now() +
            '-' +
            file.originalname;

          cb(null, uniqueName);
        },
      }),
    }),
  )

  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {

    return {

      imageUrl:
        `http://localhost:3001/uploads/${file.filename}`,
    };
  }

  @Post('attendance')
  saveAttendance(
    @Body() body: any,
  ) {

    return this.authService
      .saveAttendance(body);
  }

  @Get('attendances')
  getAttendances() {

    return this.authService
      .getAttendances();
  }
}
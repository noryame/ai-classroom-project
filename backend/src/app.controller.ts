import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {

  @Get()
  home(@Res() res: Response) {
    res.send(`
      <h1>AI Classroom</h1>
      <p>Backend NestJS fonctionne ✅</p>
    `);
  }

}
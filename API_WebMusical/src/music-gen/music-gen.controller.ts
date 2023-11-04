// music.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import Replicate from 'replicate';

@Controller('music')
export class MusicGenController {
  @Get('generate')
  async generateMusic(@Query('prompt') prompt: string) {
    if (!prompt) {
      return "La solicitud debe incluir un valor para 'prompt'.";
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
      {
        input: {
          model_version: "melody",
          prompt: prompt // Usamos el valor del 'prompt' proporcionado en la solicitud
        }
      });

    return output; // Puedes personalizar la respuesta según tus necesidades
  }
}

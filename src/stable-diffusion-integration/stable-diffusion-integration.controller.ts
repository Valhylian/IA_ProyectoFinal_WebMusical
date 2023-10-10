import { Body, Controller, Post, UseInterceptors, Res } from '@nestjs/common';
import { StableDiffusionIntegrationService } from './stable-diffusion-integration.service';
import { GenerateImageDto } from './generate-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';

@Controller('stable-diffusion-integration')
export class StableDiffusionIntegrationController {

    constructor(private readonly service:StableDiffusionIntegrationService){}
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async generateImage(@Body() data:GenerateImageDto, @Res() res: any){
        const pathFile = await this.service.generateImage(data)
        const file = createReadStream(pathFile)
        file.pipe(res)
    }
}

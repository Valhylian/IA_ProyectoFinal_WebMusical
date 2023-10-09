import { Body, Controller, Post } from '@nestjs/common';
import { StableDiffusionIntegrationService } from './stable-diffusion-integration.service';
import { GenerateImageDto } from './generate-image.dto';

@Controller('stable-diffusion-integration')
export class StableDiffusionIntegrationController {

    constructor(private readonly service:StableDiffusionIntegrationService){}
    
    @Post()
    async generateImage(@Body() data:GenerateImageDto){
        return this.service.generateImage(data)
    }
}

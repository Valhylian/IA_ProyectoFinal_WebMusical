import { Injectable } from '@nestjs/common';
import { GenerateImageDto } from './generate-image.dto';
import { HttpService } from '@nestjs/axios/dist';
import { buffer, lastValueFrom } from 'rxjs';
import { getDataFolderPath, persisteData } from 'src/utils/file.utils';

@Injectable()
export class StableDiffusionIntegrationService {
    constructor (private readonly httpService:HttpService){}

   
    async generateImage (generateImage:GenerateImageDto){
        const engineId = 'stable-diffusion-512-v2-0';

        const result = await this.httpService.post(
            `https://api.stability.ai/v1/generation/${engineId}/text-to-image`,
            {
                cfg_scale: 7,
                clip_guidance_present: 'FAST_BLUE',
                height: 512,
                width: 512,  // Corrected typo here: 'widht' to 'width'
                samples: 1,
                steps: 50,
                text_prompts: [
                    {
                        text: generateImage.prompt,
                        weight: 1,
                    }
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',  // Corrected typo here: 'aplocation' to 'application'
                    Accept: 'image/png',
                    Authorization: process.env.API_KEY_STABLEDIFFUSION,
                },
                responseType: 'arraybuffer',
            },
        );
        
        
        const data = await lastValueFrom(result);
        const filePath = `${getDataFolderPath()}/${Date.now()}.png`
        persisteData(Buffer.from(data.data), filePath)

        console.log(filePath)
        return filePath
    }
}

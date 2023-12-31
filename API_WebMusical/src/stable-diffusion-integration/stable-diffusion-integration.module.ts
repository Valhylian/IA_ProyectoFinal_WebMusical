import { Module } from '@nestjs/common';
import { StableDiffusionIntegrationService } from './stable-diffusion-integration.service';
import { StableDiffusionIntegrationController } from './stable-diffusion-integration.controller';
import { Http2ServerRequest } from 'http2';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [StableDiffusionIntegrationService],
  controllers: [StableDiffusionIntegrationController]
})
export class StableDiffusionIntegrationModule {}

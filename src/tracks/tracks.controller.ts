import { Controller } from '@nestjs/common';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
}

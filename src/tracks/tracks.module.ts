import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksController } from './tracks.controller';
import { TrackSchema } from './tracks.model';
import { TracksService } from './tracks.service';
import * as CONSTANTS from '../../utils/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CONSTANTS.SPOTIFY_TRACKS_COLLECTION_NAME, schema: TrackSchema },
    ]),
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}

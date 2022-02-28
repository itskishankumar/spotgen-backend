import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksController } from './tracks.controller';
import { TrackSchema } from './tracks.model';
import { TracksService } from './tracks.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kishankumar:Fucktheworld1@ghost0.ymhob.mongodb.net/spotgen?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'spotify_track', schema: TrackSchema }]),
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}

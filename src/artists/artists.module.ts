import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistsController } from './artists.controller';
import { ArtistSchema } from './artists.model';
import { ArtistsService } from './artists.service';
import * as CONSTANTS from '../../utils/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CONSTANTS.SPOTIFY_ARTISTS_COLLECTION_NAME, schema: ArtistSchema },
    ]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}

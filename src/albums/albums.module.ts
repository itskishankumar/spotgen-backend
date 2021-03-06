import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumsController } from './albums.controller';
import { AlbumSchema } from './albums.model';
import { AlbumsService } from './albums.service';
import * as CONSTANTS from '../../utils/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CONSTANTS.SPOTIFY_ALBUMS_COLLECTION_NAME, schema: AlbumSchema },
    ]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}

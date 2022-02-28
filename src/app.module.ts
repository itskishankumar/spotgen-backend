import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { SearchModule } from './search/search.module';
import { TracksModule } from './tracks/tracks.module';
import { InsightsModule } from './insights/insights.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as CONSTANTS from '../utils/constants';

@Module({
  imports: [
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    SearchModule,
    InsightsModule,
    MongooseModule.forRoot(CONSTANTS.MONGO_DB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

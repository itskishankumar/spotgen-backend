import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { SearchModule } from './search/search.module';
import { TracksModule } from './tracks/tracks.module';
import { InsightsModule } from './insights/insights.module';

@Module({
  imports: [
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    SearchModule,
    InsightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

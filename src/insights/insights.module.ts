import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';

@Module({
  imports: [TracksModule, ArtistsModule, AlbumsModule],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule {}

import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TracksModule, ArtistsModule, AlbumsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  async searchByName(name: string) {
    const artists = await this.artistsService.searchByName(name);
    const tracks = await this.tracksService.searchByName(name);
    const albums = await this.albumsService.searchByName(name);

    // searching each db individually and then combining their data
    return [...artists, ...tracks, ...albums];
  }
}

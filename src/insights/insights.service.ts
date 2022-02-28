import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class InsightsService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  async getAudioTrendsOverTime() {
    return await this.tracksService.getAudioTrendsOverTime();
  }

  async getArtistLongestReleaseSpans() {
    return await this.albumsService.getArtistLongestReleaseSpans();
  }

  async getGenresWithMostArtists() {
    return await this.artistsService.getGenresWithMostArtists();
  }

  async getPopularArtistsOfGenre(genre: string) {
    return await this.artistsService.getPopularArtistsOfGenre(genre);
  }

  async getTop10Genres() {
    return await this.artistsService.getTop10Genres();
  }
}

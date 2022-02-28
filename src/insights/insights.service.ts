import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { normalizeArray } from '../../utils/helper';

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

  async getTracksPopularityInsight() {
    const mostPopularTrackdata =
      await this.tracksService.getMostPopularTrackData();
    const avgTrackData = await this.tracksService.getAudioTrendsOverTime();
    // normalising the deviation from the avg value. could not find corresponding aggregate func, hence performing compute here
    let deviationsArray = [];
    for (let i = 0; i < mostPopularTrackdata.length; i++) {
      let sumOfDeviations = 0;
      sumOfDeviations +=
        Math.abs(
          mostPopularTrackdata[i].acousticness -
            avgTrackData[i].avgAcousticness,
        ) +
        Math.abs(
          mostPopularTrackdata[i].danceability -
            avgTrackData[i].avgDanceability,
        ) +
        Math.abs(
          mostPopularTrackdata[i].instrumentalness -
            avgTrackData[i].avgInstrumentalness,
        ) +
        Math.abs(
          mostPopularTrackdata[i].liveness - avgTrackData[i].avgLiveness,
        ) +
        Math.abs(mostPopularTrackdata[i].valence - avgTrackData[i].avgValence) +
        Math.abs(mostPopularTrackdata[i].energy - avgTrackData[i].avgEnergy) +
        Math.abs(
          mostPopularTrackdata[i].speechiness - avgTrackData[i].avgSpeechiness,
        );
      deviationsArray.push(sumOfDeviations);
    }
    deviationsArray = normalizeArray(deviationsArray);
    for (let i = 0; i < mostPopularTrackdata.length; i++) {
      mostPopularTrackdata[i]['normalizedDeviationFromAvg'] =
        deviationsArray[i];
      // mostPopularTrackdata[i].delete('acousticness');
      delete mostPopularTrackdata[i]['acousticness'];
      delete mostPopularTrackdata[i]['danceability'];
      delete mostPopularTrackdata[i]['instrumentalness'];
      delete mostPopularTrackdata[i]['liveness'];
      delete mostPopularTrackdata[i]['valence'];
      delete mostPopularTrackdata[i]['energy'];
      delete mostPopularTrackdata[i]['speechiness'];
    }
    return mostPopularTrackdata;
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { InsightsService } from './insights.service';

@Controller('insights/')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get('/getAudioTrendsOverTime')
  async getAudioTrendsOverTime() {
    return await this.insightsService.getAudioTrendsOverTime();
  }

  @Get('/getArtistLongestReleaseSpans')
  async getArtistLongestReleaseSpans() {
    return await this.insightsService.getArtistLongestReleaseSpans();
  }

  @Get('/getGenresWithMostArtists')
  async getGenresWithMostArtists() {
    return await this.insightsService.getGenresWithMostArtists();
  }

  @Get('/getPopularArtistsOfGenre/:genre')
  async getPopularArtistsOfGenre(@Param('genre') genre: string) {
    return await this.insightsService.getPopularArtistsOfGenre(genre);
  }

  @Get('/getTop10Genres')
  async getTop10Genres() {
    return await this.insightsService.getTop10Genres();
  }
}

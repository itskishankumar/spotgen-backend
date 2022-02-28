import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // not throwing an error here on empty search because might refactor search to include params and give non-empty results
  @Get(':name')
  async searchByName(@Param('name') name: string) {
    return await this.searchService.searchByName(
      decodeURIComponent(name).toLowerCase(),
    );
  }
}

import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  // throwing a 404 error here even when it's NOT an un-successfull request because by design i'm considering the data as NOT FOUND, rather than EMPTY
  @Get('findById/:id')
  async findById(@Param('id') id: string) {
    const data = await this.artistsService.findById(id);
    if (data == undefined || data == null || data == [] || data.length == 0) {
      throw new NotFoundException();
    }
    return data;
  }
}

import { NotFoundException, Controller, Get, Param } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  // throwing a 404 error here even when it's NOT an un-successfull request because by design i'm considering the data as NOT FOUND, rather than EMPTY
  @Get('findById/:id')
  async findById(@Param('id') id: string) {
    const data = await this.albumsService.findById(id);
    if (data == undefined || data == null || data == []) {
      throw new NotFoundException();
    }
    return data;
  }
}

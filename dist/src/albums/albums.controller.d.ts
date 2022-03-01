import { AlbumsService } from './albums.service';
export declare class AlbumsController {
    private readonly albumsService;
    constructor(albumsService: AlbumsService);
    findById(id: string): Promise<any[]>;
}

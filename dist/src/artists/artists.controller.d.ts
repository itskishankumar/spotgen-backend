import { ArtistsService } from './artists.service';
export declare class ArtistsController {
    private readonly artistsService;
    constructor(artistsService: ArtistsService);
    findById(id: string): Promise<any[]>;
}

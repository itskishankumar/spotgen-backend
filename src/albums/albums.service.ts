import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlbumInterface } from './albums.model';
import * as CONSTANTS from '../../utils/constants';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(CONSTANTS.SPOTIFY_ALBUMS_COLLECTION_NAME)
    private albumModel: Model<AlbumInterface>,
  ) {}

  async searchByName(name: string) {
    const data = await this.albumModel
      .find({ $text: { $search: name } }, { score: { $meta: 'textScore' } })
      .limit(10)
      .sort({ score: { $meta: 'textScore' } });
    return data.map((album) => ({
      id: album.id,
      artist_id: album.artist_id,
      name: album.name,
      score: album.score,
      type: album.type,
      image: album.image,
    }));
  }

  async findById(id: string) {
    let data = await this.albumModel.aggregate([
      {
        $match: {
          id: id,
        },
      },
      {
        $lookup: {
          from: 'spotify_artists',
          localField: 'artist_id',
          foreignField: 'id',
          as: 'artist_name',
        },
      },
      {
        $set: {
          release_date: {
            $year: '$release_date',
          },
          artist_name: {
            $arrayElemAt: ['$artist_name.name', 0],
          },
          artist_id: {
            $arrayElemAt: ['$artist_name.id', 0],
          },
        },
      },
      {
        $lookup: {
          from: 'spotify_tracks',
          localField: 'id',
          foreignField: 'album_id',
          as: 'tracks',
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          image: 1,
          release_date: 1,
          artist_name: 1,
          artist_id: 1,
          'tracks.name': 1,
          'tracks.id': 1,
          'tracks.album_id': 1,
          'tracks.popularity': 1,
        },
      },
    ]);
    data = data[0];
    return data;
  }

  async getArtistLongestReleaseSpans() {
    const data = await this.albumModel.aggregate([
      {
        $group: {
          _id: '$artist_id',
          release_last: {
            $max: '$release_date',
          },
          release_first: {
            $min: '$release_date',
          },
        },
      },
      {
        $set: {
          release_diff: {
            $dateDiff: {
              startDate: '$release_first',
              endDate: '$release_last',
              unit: 'week',
            },
          },
        },
      },
      {
        $sort: {
          release_diff: -1,
        },
      },
      {
        $skip: 1,
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: 'spotify_artists',
          localField: '_id',
          foreignField: 'id',
          as: 'artist_name',
        },
      },
      {
        $project: {
          _id: 0,
          artist_name: {
            $arrayElemAt: ['$artist_name.name', 0],
          },
          artist_id: {
            $arrayElemAt: ['$artist_name.id', 0],
          },
          release_first: {
            $year: '$release_first',
          },
          release_last: {
            $year: '$release_last',
          },
        },
      },
    ]);
    return data;
  }
}

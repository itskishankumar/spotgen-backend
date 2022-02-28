import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistInterface } from './artists.model';
import * as CONSTANTS from '../../utils/constants';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectModel(CONSTANTS.SPOTIFY_ARTISTS_COLLECTION_NAME)
    private artistModel: Model<ArtistInterface>,
  ) {}

  async searchByName(name: string) {
    const data = await this.artistModel
      .find({ $text: { $search: name } }, { score: { $meta: 'textScore' } })
      .limit(10)
      .sort({ score: { $meta: 'textScore' } });
    return data.map((artist) => ({
      id: artist.id,
      artist_id: artist.id,
      name: artist.name,
      score: artist.score,
      type: artist.type,
    }));
  }

  async findById(id: string) {
    let data = await this.artistModel.aggregate([
      {
        $match: {
          id: id,
        },
      },
      {
        $lookup: {
          from: 'spotify_albums',
          localField: 'id',
          foreignField: 'artist_id',
          as: 'albums',
        },
      },
      {
        $project: {
          _id: 0,
          artist_popularity: 1,
          followers: 1,
          name: 1,
          'albums.image': 1,
          'albums.name': 1,
          'albums.release_date': 1,
          'albums.id': 1,
        },
      },
    ]);
    // performing some calc here because didn't find corresponding mongo aggregate func
    if (data != undefined && data != null && data != [] && data.length != 0) {
      data = data[0];
      data['followers'] = data['followers'].toLocaleString();
      data['albums'].forEach((album) => {
        album.release_date = album.release_date.getUTCFullYear().toString();
      });
    }
    return data;
  }

  async getGenresWithMostArtists() {
    const data = await this.artistModel.aggregate([
      {
        $group: {
          _id: '$genre',
          noOfArtists: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          noOfArtists: -1,
        },
      },
      {
        $limit: 11,
      },
      {
        $project: {
          genre: '$_id',
          noOfArtists: 1,
          _id: 0,
        },
      },
      {
        $skip: 1,
      },
    ]);
    return data;
  }

  async getPopularArtistsOfGenre(genre: string) {
    const data = await this.artistModel.aggregate([
      {
        $match: {
          genre: genre,
        },
      },
      {
        $sort: {
          artist_popularity: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          artist_name: '$name',
          genre: '$genre',
          artist_followers: '$followers',
          artist_popularity: '$artist_popularity',
          _id: 0,
          id: 1,
        },
      },
    ]);
    return data;
  }

  async getTop10Genres() {
    const data = await this.artistModel.aggregate([
      {
        $group: {
          _id: '$genre',
          noOfArtists: {
            $sum: 1,
          },
        },
      },
      {
        $set: {
          genre: '$_id',
        },
      },
      {
        $project: {
          genre: 1,
          _id: 0,
          noOfArtists: 1,
        },
      },
      {
        $sort: {
          noOfArtists: -1,
        },
      },
      {
        $skip: 1,
      },
      {
        $limit: 10,
      },
    ]);
    return data;
  }
}

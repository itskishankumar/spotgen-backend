import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrackInterface } from './tracks.model';
import * as CONSTANTS from '../../utils/constants';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(CONSTANTS.SPOTIFY_TRACKS_COLLECTION_NAME)
    private trackModel: Model<TrackInterface>,
  ) {}

  async searchByName(name: string) {
    const data = await this.trackModel
      .find({ $text: { $search: name } }, { score: { $meta: 'textScore' } })
      .limit(10)
      .sort({ score: { $meta: 'textScore' } });
    return data.map((track) => ({
      id: track.id,
      album_id: track.album_id,
      name: track.name,
      score: track.score,
      type: track.type,
    }));
  }

  // refactor set release date to use $ year
  async getAudioTrendsOverTime() {
    const data = await this.trackModel.aggregate([
      {
        $lookup: {
          from: 'spotify_albums',
          localField: 'album_id',
          foreignField: 'id',
          as: 'release_date',
        },
      },
      {
        $set: {
          release_date: {
            $substr: [
              {
                $arrayElemAt: ['$release_date.release_date', 0],
              },
              0,
              4,
            ],
          },
          duration: {
            $divide: ['$duration_ms', 60000],
          },
        },
      },
      {
        $group: {
          _id: '$release_date',
          avgAcousticness: {
            $avg: '$acousticness',
          },
          avgDanceability: {
            $avg: '$danceability',
          },
          avgSpeechiness: {
            $avg: '$speechiness',
          },
          avgValence: {
            $avg: '$valence',
          },
          avgLoudness: {
            $avg: '$loudness',
          },
          avgEnergy: {
            $avg: '$energy',
          },
          avgLiveness: {
            $avg: '$liveness',
          },
          avgInstrumentalness: {
            $avg: '$instrumentalness',
          },
          avgDuration: {
            $avg: '$duration',
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $set: {
          year: '$_id',
        },
      },
      {
        $unset: ['_id', 'duration_ms'],
      },
    ]);
    return data;
  }
}

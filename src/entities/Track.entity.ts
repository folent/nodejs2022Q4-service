import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export interface TrackEntity {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  artistId: string | null;
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
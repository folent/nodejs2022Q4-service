import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export interface AlbumEntity {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
  }

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
  artistId: string | null; // refers to Artist
}
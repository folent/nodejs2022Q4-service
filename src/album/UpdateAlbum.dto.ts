import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateAlbumDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsNumber()
    year: number;
    artistId: string | null; // refers to Artist
  }
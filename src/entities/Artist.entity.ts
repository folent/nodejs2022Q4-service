import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export interface ArtistEntity {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
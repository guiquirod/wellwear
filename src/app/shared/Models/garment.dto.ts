import { FabricType } from '../Enum/fabric-type';
import { GarmentLenght } from '../Enum/garment-lenght';
import { GarmentSection, GarmentType } from '../Enum/garment-type';
import { Season } from '../Enum/season';

export interface GarmentDTO {
  id: string;
  type: GarmentType;
  supType: GarmentSection;
  fabricType: FabricType[];
  mainColor: string;
  sleeve: GarmentLenght;
  seasons: Season[];
  picture: string;
  pattern: boolean;
  isSecondHand: boolean;
  worn: number;
  outfited: number;
}

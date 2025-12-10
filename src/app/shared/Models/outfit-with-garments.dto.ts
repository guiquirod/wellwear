import { GarmentDTO } from './garment.dto';

export interface OutfitWithGarments {
  id: string;
  garments: GarmentDTO[];
}

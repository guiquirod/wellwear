export enum GarmentType {
  Camiseta = 'camiseta',
  Camisa = 'camisa',
  Polo = 'polo',
  Cazadora = 'cazadora',
  Sudadera = 'sudadera',
  Chandal = 'chandal',
  Jersey = 'jersey',
  Abrigo = 'abrigo',
  Vestido = 'vestido',
  Pantalon = 'pantalon',
  Falda = 'falda',
  Zapatos = 'zapatos',
  Botines = 'botines',
  Sandalias = 'sandalias',
  Botas = 'botas',
}

export enum GarmentSection {
  Top = 'superior',
  Bottom = 'inferior',
}

export const GarmentTypeBySection = [
  { section: GarmentSection.Top, type: GarmentType.Camiseta },
  { section: GarmentSection.Top, type: GarmentType.Camisa },
  { section: GarmentSection.Top, type: GarmentType.Polo },
  { section: GarmentSection.Top, type: GarmentType.Jersey },
  { section: GarmentSection.Top, type: GarmentType.Camisa },
  { section: GarmentSection.Top, type: GarmentType.Cazadora },
  { section: GarmentSection.Top, type: GarmentType.Abrigo },
  { section: GarmentSection.Bottom, type: GarmentType.Pantalon },
  { section: GarmentSection.Bottom, type: GarmentType.Falda },
  { section: GarmentSection.Bottom, type: GarmentType.Zapatos },
  { section: GarmentSection.Bottom, type: GarmentType.Sandalias },
];

export const topGarments = GarmentTypeBySection.filter(
  (item) => item.section === GarmentSection.Top
).map((garment) => garment.type);
export const bottomGarments = GarmentTypeBySection.filter(
  (item) => item.section === GarmentSection.Bottom
).map((garment) => garment.type);

export function garmentIcon(type: GarmentType): number {
  switch (type) {
    case GarmentType.Camiseta:
      return 0;
    case GarmentType.Camisa:
      return 1;
    case GarmentType.Sudadera:
      return 2;
    case GarmentType.Jersey:
      return 3;
    case GarmentType.Abrigo:
      return 4;
    case GarmentType.Polo:
      return 5;
    case GarmentType.Pantalon:
      return 6;
    case GarmentType.Falda:
      return 7;
    case GarmentType.Zapatos:
      return 8;
    case GarmentType.Sandalias:
      return 9;
    case GarmentType.Cazadora:
      return 10;
    default:
      return 0;
  }
}
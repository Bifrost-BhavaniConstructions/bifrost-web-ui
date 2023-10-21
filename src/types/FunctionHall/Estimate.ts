export interface Estimate {
  hallTariff: number;
  furnitureUtilityCharges: number;
  maintenanceCharges: number;
  applicableTaxes: number;
  additionalGuestRoomTariff: number;
  electricityTariff: number;
  securityTariff: number;
  generatorTariff: number;
  createdAt?: Date;
  updatedAt?: Date;
}

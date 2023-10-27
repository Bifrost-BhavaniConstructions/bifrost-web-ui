import { InventoryType } from "./Inventory";
import { GeneratorStatus } from "./Generator";
import { PowerMeterStatus } from "./PowerMeter";
import { RoomStatus } from "./Room";

export interface StatStatus {
  roomsAll: RoomStatus[][];
  powerMetersAll: PowerMeterStatus[][];
  generatorsAll: GeneratorStatus[];
  securityGuards: number[];
  inventoryAll: InventoryType[][];
}

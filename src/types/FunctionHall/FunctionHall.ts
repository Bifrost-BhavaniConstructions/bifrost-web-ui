import { InventoryType } from "./Inventory";
import { PowerMeter } from "./PowerMeter";
import { Generator } from "./Generator";
import { Room } from "./Room";

interface FunctionHall {
  _id?: string;
  name: string;
  address: string;
  inventory: InventoryType[];
  generators: Generator[];
  powerMeters: PowerMeter[];
  rooms: Room[];
}

export default FunctionHall;

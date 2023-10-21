export interface InventoryType {
  name: string;
  count: number;
  charge: number;
}

export interface Inventory {
  items: InventoryType[];
  createdAt: Date;
  createdBy: Date;
}

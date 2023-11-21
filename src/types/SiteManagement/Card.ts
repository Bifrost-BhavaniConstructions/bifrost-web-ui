import { User } from "../User";
import { VehicleAssignment } from "./SubTypes/VehicleAssignment";

export interface Card {
  _id?: string;
  name: string;
  number: string;
  expiry: string;
  nameOnCard: string;
  assignedTo?: Partial<User>;
  assignmentHistory: VehicleAssignment[];
}

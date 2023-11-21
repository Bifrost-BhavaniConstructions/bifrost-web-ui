import { User } from "../User";
import { VehicleAssignment } from "./SubTypes/VehicleAssignment";

export interface Phone {
  _id?: string;
  name: string;
  number: string;
  assignedTo?: Partial<User>;
  assignmentHistory: VehicleAssignment[];
}

import { User } from "../User";
import { VehicleAssignment } from "./SubTypes/VehicleAssignment";

export interface Vehicle {
  _id?: string;
  name: string;
  number: string;
  chassis: string;
  class: string;
  model: string;
  make: string;
  puc: string;
  fitness: Date;
  permit: Date;
  insurance: Date;
  insuranceCompany: string;
  tax: Date;
  regValidity: Date;
  taxType: string;
  insuranceType: string;
  assignedTo?: Partial<User>;
  assignmentHistory: VehicleAssignment[];
}

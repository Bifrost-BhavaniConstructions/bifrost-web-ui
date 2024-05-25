import { SiteShiftEnum } from "../../enums/SiteShiftEnum";
import { UserRoleEnum } from "../../enums/UserRoleEnum";
import { SiteDutyTypeEnum } from "../../enums/SiteDutyTypeEnum";

export interface VendorTypeData {
  name: string;
  cost: number;
  charge?: number;
  amount?: number;
}
export interface Attendance {
  _id?: string;
  of: string;
  shift?: SiteShiftEnum;
  role: UserRoleEnum;
  vendorItems?: VendorTypeData[];
  otPay?: number;
  site: string;
  on: Date;
  dutyType?: SiteDutyTypeEnum;
  shiftPay?: number;
}

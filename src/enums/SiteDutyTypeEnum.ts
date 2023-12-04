import { PlatformEnum } from "./PlatformEnum";

export enum SiteDutyTypeEnum {
  DUTY = "DUTY",
  IDLE = "IDLE",
}

export const getSiteDutyTypeEnumFromString = (
  value: string,
): SiteDutyTypeEnum | undefined => {
  const keys = Object.keys(
    SiteDutyTypeEnum,
  ) as (keyof typeof SiteDutyTypeEnum)[];

  for (const key of keys) {
    if (SiteDutyTypeEnum[key] === value) {
      return SiteDutyTypeEnum[key];
    }
  }

  return undefined; // Return undefined if no match is found
};

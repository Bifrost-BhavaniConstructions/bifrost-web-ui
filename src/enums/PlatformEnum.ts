export enum PlatformEnum {
  SITE = "SITE",
  FUNCTION_HALL = "FUNCTION_HALL",
}

export const getPlatformEnumFromString = (
  value: string,
): PlatformEnum | undefined => {
  const keys = Object.keys(PlatformEnum) as (keyof typeof PlatformEnum)[];

  for (const key of keys) {
    if (PlatformEnum[key] === value) {
      return PlatformEnum[key];
    }
  }

  return undefined; // Return undefined if no match is found
};

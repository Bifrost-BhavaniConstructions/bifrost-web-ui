export enum PartOfDayEnum {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  NIGHT = "NIGHT",
}
export const getPartOfDayEnumFromString = (
  typeString: string,
): PartOfDayEnum | undefined => {
  switch (typeString) {
    case PartOfDayEnum.MORNING:
    case PartOfDayEnum.AFTERNOON:
    case PartOfDayEnum.NIGHT:
      return typeString as PartOfDayEnum;
    default:
      return undefined; // Return undefined for an invalid string
  }
};

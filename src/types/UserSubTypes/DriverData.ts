interface DriverAllowanceData {
  dayShift: number;
  nightShift: number;
  doubleShift: number;
}
interface DriverData {
  salary: number;
  allowance: DriverAllowanceData;
  license: string;
}

export default DriverData;

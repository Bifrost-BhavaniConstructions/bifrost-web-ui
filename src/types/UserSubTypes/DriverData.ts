interface DriverAllowanceData {
  dayShift: number;
  nightShift: number;
  doubleShift: number;
}
interface DriverData {
  salary: number;
  allowance: DriverAllowanceData;
  license: string;
  idlePay?: number;
}

export default DriverData;

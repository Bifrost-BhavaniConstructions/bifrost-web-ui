interface VendorTypeData {
  name: string;
  charge: number;
}
interface VendorData {
  items: VendorTypeData[];
}

export default VendorData;

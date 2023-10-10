import { action } from "easy-peasy";
import { PeopleStoreModel } from "./peopleStoreModel";
import { UserRoleEnum } from "../../enums/UserRoleEnum";

const PeopleStore: PeopleStoreModel = {
  users: [
    {
      username: "john_doe",
      password: "secret_password",
      role: UserRoleEnum.SUPER_ADMIN,
      name: "John Doe",
      personalMobileNumber: "123-456-7890",
      bankAccountPersonal: {
        bankName: "Example Bank",
        accountNo: "",
        accountHolder: "",
        branch: "",
        ifsc: "",
      },
      aadhaar: "1234-5678-9012",
      pan: "ABCD12345E",
      nickname: "Johnny",
      dob: "1990-01-01",
      platforms: [],
      supervisorData: {
        companyMobileNumber: "",
        payOT: 1,
        salary: 1,
      },
      driverData: {
        salary: 1,
        allowance: {
          dayShift: 1,
          doubleShift: 2,
          nightShift: 1,
        },
        license: "1",
      },
    },
  ],
  setUsers: action((state, payload) => {
    state.users = payload;
  }),
};

export default PeopleStore;

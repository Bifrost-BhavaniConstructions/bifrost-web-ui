import { action, thunk } from "easy-peasy";
import { PeopleStoreModel } from "./peopleStoreModel";
import { UserRoleEnum } from "../../enums/UserRoleEnum";
import { PlatformEnum } from "../../enums/PlatformEnum";
import { getAllUsers } from "../../adapters/PeopleAdapter";
import { toast } from "react-toastify";

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
      platforms: [PlatformEnum.FUNCTION_HALL],
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
  fetchUsers: thunk((actions) => {
    getAllUsers()
      .then((res) => {
        actions.setUsers(res);
      })
      .catch((err) => {
        console.error(err);
        toast("Error Fetching People", { type: "error" });
      });
  }),
};

export default PeopleStore;

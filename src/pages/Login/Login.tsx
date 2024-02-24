import React from "react";
import "./Login.css";
import LabelledInput from "../../components/LabelledFormInputs/LabelledInput";
import { DeleteIcon } from "@chakra-ui/icons";
import TailwindButton from "../../components/TailwindButton";
import { loginUserWithUsernamePassword } from "../../adapters/AuthAdapter";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  // Functions

  // Hook Functions
  const navigate = useNavigate();

  const submitData = async () => {
    const token = await loginUserWithUsernamePassword(username, password);
    if (token) {
      navigate(`/login-redirect?token=${token}`);
    }
  };

  return (
    <div className="w-[100%] h-[100%] bg-main-bg flex justify-center items-center">
      <div className="flex flex-col">
        <form
          onSubmit={() => {
            submitData();
          }}
        >
          <LabelledInput
            name={"username"}
            value={username}
            setValue={(_val: string) => {
              setUsername(_val);
            }}
          />
          <LabelledInput
            name={"password"}
            value={password}
            inputProps={{ type: "password" }}
            setValue={(_val: string) => {
              setPassword(_val);
            }}
          />
        </form>
        <TailwindButton
          text={"Login"}
          isDisabled={username === "" || password === ""}
          onClick={() => {
            submitData();
          }}
          className="mt-[18px] justify-center"
        />
      </div>
    </div>
  );
};

export default Login;

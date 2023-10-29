import React from "react";
import "./Home.css";
import HomeFunctionHall from "./HomeFunctionHall";
import AddEnquiryModal from "../../../components/modals/AddEnquiryModal";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  // Objects
  const navigate = useNavigate();

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div className="flex h-[calc(100%-88px)] w-[100%] flex-col">
      <HomeFunctionHall />
    </div>
  );
};

export default Home;

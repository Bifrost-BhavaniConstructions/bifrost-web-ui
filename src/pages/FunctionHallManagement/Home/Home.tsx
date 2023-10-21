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
  const [openEnquiry, setOpenEnquiry] = React.useState(false);

  // Functions

  // Hook Functions

  return (
    <div className="flex h-[calc(100%-88px)] w-[100%] flex-col">
      <HomeFunctionHall />
      <div className="flex flex-grow p-[8px]">
        <div className="flex flex-grow p-[2px] rounded-[4px]">
          <div className="flex flex-1 flex-grow p-[4px] rounded-[4px]">
            <div
              onClick={() => {
                setOpenEnquiry(true);
              }}
              className="flex flex-grow p-[2px] bg-low-bg rounded-[4px] justify-center items-center"
            >
              Create Enquiry
            </div>
          </div>
          <div className="flex  flex-1 flex-grow p-[4px] rounded-[4px]">
            <div
              onClick={() => {
                navigate("/function-hall-management/queries");
              }}
              className="flex flex-grow p-[2px] bg-low-bg rounded-[4px] justify-center items-center"
            >
              View All Enquiries
            </div>
          </div>
        </div>
      </div>
      <AddEnquiryModal
        closeCallback={() => {
          setOpenEnquiry(false);
        }}
        open={openEnquiry}
      />
    </div>
  );
};

export default Home;

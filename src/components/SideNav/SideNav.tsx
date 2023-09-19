import React from 'react';
import './SideNav.css';
import {XMarkIcon} from "@heroicons/react/24/solid";
import {useStoreActions} from "../../store/hooks";

interface SideNavProps {
    clicked: boolean;
    setClicked: Function;
}

const SideNav: React.FC<SideNavProps> = ({clicked, setClicked}) => {

    // Objects
    const {logoutUser} = useStoreActions(actions => actions.userStore);

    // Variables
    const footer = [
        {
            label: "Logout",
            action: () => {
                logoutUser()
            }
        }
    ]

    // State Variables - Hooks

    // Functions

    // Hook Functions


    return (
        <div className={clicked?"absolute bg-main-bg w-0 right-0 top-0 overflow-x-hidden p-2 flex-col h-[100%] open-nav":"absolute w-0 right-0 top-0 h-[100%] overflow-x-hidden hidden p-2 flex-col close-nav"}>
            <div className="flex h-[72px] w-[100%] flex-row bg-main-bg rounded-[10px] justify-center items-center">
                <div className="flex flex-grow font-airbnb font-light py-[8px] px-[16px] h-[100%] items-center"/>
                <div className="w-[72px] flex justify-center items-center" >
                    <div className="flex w-[40px] h-[40px] bg-low-bg justify-center items-center rounded-[8px]" onClick={() => {setClicked(false)}}>
                        <XMarkIcon className="w-[24px]" />
                    </div>
                </div>
            </div>
            <div className="flex flex-grow">

            </div>
            <div className="flex h-[72px] items-center font-airbnb font-normal text-[16px] justify-center flex-col">
                {
                    footer.map((item) =>
                        <div key={item.label} className="flex justify-center" onClick={() => {item.action()}}>
                            <div className="flex justify-center px-[32px] py-[8px] bg-low-bg rounded-[4px]">
                                {item.label}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
};

export default SideNav;
import React from 'react';
import './Dock.css';
import {useStoreState} from "../../store/hooks";
import {Bars3Icon} from "@heroicons/react/24/solid";
import SideNav from "../SideNav";
import httpClient from "../../config/AxiosInterceptors";

interface SiteManagementNavBarProps {

}

const Dock: React.FC<SiteManagementNavBarProps> = () => {

    // Objects

    // Variables

    // State Variables - Hooks
    const {user} = useStoreState(state => state.userStore)
    const [navOpened, setNavOpened] = React.useState(false);

    // Functions

    // Hook Functions
    React.useEffect(() => {
        if(navOpened){
            httpClient.get('/auth/pulse')
        }
    },[navOpened])

    return (
        <>
            <div className="flex h-[72px] w-[100%] flex-row bg-low-bg rounded-[10px] justify-center items-center">
                <div className="flex flex-grow font-airbnb font-light py-[8px] px-[16px] h-[100%] items-center">
                    <div className="flex flex-col">
                        <div className="text-[12px]">Welcome,</div>
                        <div className="">{user?.nickname}</div>
                    </div>
                </div>
                <div className="w-[72px] flex justify-center items-center">
                    <div className="flex w-[40px] h-[40px] bg-main-bg justify-center items-center rounded-[8px]" onClick={() => {setNavOpened(true)}}>
                        <Bars3Icon className="w-[24px]" />
                    </div>
                </div>
            </div>
            <SideNav clicked={navOpened} setClicked={setNavOpened} />
        </>
    )
};

export default Dock;
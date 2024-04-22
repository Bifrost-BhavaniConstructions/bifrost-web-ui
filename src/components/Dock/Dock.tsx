import React from "react";
import "./Dock.css";
import { useStoreActions, useStoreState } from "../../store/hooks";
import {
  ArchiveBoxXMarkIcon,
  ArrowsUpDownIcon,
  Bars3Icon,
  BookOpenIcon,
  HomeIcon,
  HomeModernIcon,
  ListBulletIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid";
import SideNav from "../SideNav";
import httpClient from "../../config/AxiosInterceptors";
import { PlatformEnum } from "../../enums/PlatformEnum";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CurrencyRupeeIcon, UserIcon } from "@heroicons/react/20/solid";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";

interface DockProps {
  platform: PlatformEnum;
}

const Dock: React.FC<DockProps> = ({ platform }) => {
  // Objects
  const siteManagementHeader = [
    {
      label: "Home",
      url: "/site-management",
      icon: <HomeIcon color="white" width={18} />,
    },
    {
      label: "Cash Accounts",
      url: "/site-management/cash-account",
      icon: <CurrencyRupeeIcon color="white" width={18} />,
    },
    {
      label: "Attendance",
      url: "/site-management/attendance",
      icon: <ShieldExclamationIcon color="white" width={18} />,
    },
    {
      label: "Assets",
      url: "/site-management/assets",
      icon: <HomeIcon color="white" width={18} />,
    },
    {
      label: "Sites",
      url: "/site-management/sites",
      icon: <HomeIcon color="white" width={18} />,
    },
    {
      label: "People",
      url: "/site-management/people",
      icon: <HomeIcon color="white" width={18} />,
    },
    {
      label: "PRs",
      url: "/site-management/pr",
      icon: <HomeIcon color="white" width={18} />,
    },
    {
      label: "Salaries/Allowances",
      url: "/site-management/salaries-allowances",
      icon: <HomeIcon color="white" width={18} />,
    },
    {
      label: "Manage System",
      url: "/site-management/manage-system",
      icon: <HomeIcon color="white" width={18} />,
    },
  ];
  const functionHallManagementHeader = [
    {
      label: "Home",
      url: "/function-hall-management",
      icon: <HomeIcon color="white" width={18} />,
    },
    {
      label: "Function Halls",
      url: "/function-hall-management/function-hall",
      icon: <HomeModernIcon color="white" width={18} />,
    },
    {
      label: "Enquiries/Bookings",
      url: "/function-hall-management/queries",
      icon: <BookOpenIcon color="white" width={18} />,
    },
    {
      label: "Closed Bookings/Enquiries",
      url: "/function-hall-management/closed-queries",
      icon: <ArchiveBoxXMarkIcon color="white" width={18} />,
    },
    {
      label: "Completed Bookings",
      url: "/function-hall-management/completed-bookings",
      icon: <ShieldCheckIcon color="white" width={18} />,
    },
    {
      label: "Cash Accounts",
      url: "/function-hall-management/cash-accounts",
      icon: <CurrencyRupeeIcon color="white" width={18} />,
    },
    {
      label: "All Transactions",
      url: "/function-hall-management/all-transactions",
      icon: <ListBulletIcon color="white" width={18} />,
    },
    {
      label: "People",
      url: "/function-hall-management/people",
      icon: <UserIcon color="white" width={18} />,
    },
  ];
  // Variables

  // State Variables - Hooks
  const { user } = useStoreState((state) => state.userStore);
  const { logoutUser } = useStoreActions((actions) => actions.userStore);
  const [navOpened, setNavOpened] = React.useState(false);
  const navigate = useNavigate();
  const { fetchEnquiries, fetchFunctionHalls, fetchEnquiryTypes } =
    useStoreActions((actions) => actions.functionHallStore);

  const fetchUsers = useStoreActions(
    (actions) => actions.peopleStore.fetchUsers,
  );
  const { fetchTransactionPurposes } = useStoreActions(
    (actions) => actions.cashAccountStore,
  );
  const {
    fetchSites,
    fetchVehicles,
    fetchPhones,
    fetchCards,
    fetchPurchaseRequests,
  } = useStoreActions((actions) => actions.siteManagementStore);
  // Functions

  // Hook Functions
  React.useEffect(() => {
    if (navOpened) {
      httpClient.get("/auth/pulse");
    }
  }, [navOpened]);

  function switchPlatform() {
    fetchEnquiries();
    fetchFunctionHalls();
    fetchUsers();
    fetchEnquiryTypes();
    fetchTransactionPurposes();
    fetchSites();
    fetchVehicles();
    fetchPhones();
    fetchCards();
    fetchPurchaseRequests(user!._id!);
    if (platform === PlatformEnum.SITE) {
      navigate("/function-hall-management");
    } else {
      navigate("/site-management");
    }
  }

  return (
    <div className="flex flex-col md:h-full">
      <div className="hidden border-r bg-muted/40 md:block h-full">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-18 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="">Bifrost</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {(platform === PlatformEnum.SITE
                ? siteManagementHeader
                : functionHallManagementHeader
              ).map((headerItem) => (
                <Link
                  onClick={() => {
                    setNavOpened(false);
                    navigate(headerItem.url);
                  }}
                  className={`flex items-center gap-3 ${
                    window.location.pathname === headerItem.url
                      ? "bg-muted"
                      : ""
                  } rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                >
                  {headerItem.icon}
                  {headerItem.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <div className="text-white text-center text-[12px] mb-[24px]">
              <span
                className="cursor-pointer"
                onClick={() => {
                  logoutUser();
                }}
              >
                logout
              </span>
            </div>
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Switch Application </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    switchPlatform();
                  }}
                >
                  Switch to
                  {platform === PlatformEnum.SITE
                    ? " Function Halls"
                    : " Site Management"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex w-full min-w-full md:hidden">
        <header className="flex w-full h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <HamburgerMenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium mt-[20px]">
                {(platform === PlatformEnum.SITE
                  ? siteManagementHeader
                  : functionHallManagementHeader
                ).map((headerItem) => (
                  <SheetClose asChild>
                    <Link
                      onClick={() => {
                        setNavOpened(false);
                        navigate(headerItem.url);
                      }}
                      className={`flex items-center gap-3 ${
                        window.location.pathname === headerItem.url
                          ? "bg-muted"
                          : ""
                      } rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                    >
                      {headerItem.icon}
                      {headerItem.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative font-airbnb font-semibold text-center">
                Bifrost
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <PersonIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                Logged in as <br />
                {user!.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  switchPlatform();
                }}
              >
                Switch to <br />
                {platform === PlatformEnum.SITE
                  ? "Function Halls"
                  : "Site Management"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logoutUser();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
    </div>
  );
};

export default Dock;

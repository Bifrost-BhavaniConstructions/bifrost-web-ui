import React from "react";
import "./Assets.css";
import TailwindButton from "../../../components/TailwindButton";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import IndividualVehicle from "./IndividualVehicle";
import {
  addCard,
  addPhone,
  addVehicle,
  assignCard,
  assignPhone,
  assignVehicle,
  updateCard,
  updatePhone,
  updateVehicle,
} from "../../../adapters/SiteManagementAdapter";
import Radio from "../../../components/Radio";
import AddOrUpdateVehicleModal from "../../../components/modals/AddOrUpdateVehicleModal";
import { Vehicle } from "../../../types/SiteManagement/Vehicle";
import { Phone } from "../../../types/SiteManagement/Phone";
import IndividualPhone from "./IndividualPhone";
import AddOrUpdatePhoneModal from "../../../components/modals/AddOrUpdatePhoneModal";
import { Card } from "../../../types/SiteManagement/Card";
import IndividualCard from "./IndividualCard";
import AddOrUpdateCardModal from "../../../components/modals/AddOrUpdateCardModal";
import ReassignVehicleModal from "../../../components/modals/AddOrUpdateVehicleModal/ReassignVehicleModal";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";

interface AssetsProps {}

enum AssetType {
  VEHICLE,
  PHONE,
  CARD,
}

const Assets: React.FC<AssetsProps> = () => {
  // Objects
  const { vehicles, phones, cards } = useStoreState(
    (state) => state.siteManagementStore,
  );
  const { fetchVehicles, fetchPhones, fetchCards } = useStoreActions(
    (actions) => actions.siteManagementStore,
  );
  // Variables

  // State Variables - Hooks
  const [open, setOpen] = React.useState(false);
  const [editVehicle, setEditVehicle] = React.useState<Vehicle | undefined>();
  const [reassignVehicle, setReassignVehicle] = React.useState<
    string | undefined
  >();
  const [reassignPhone, setReassignPhone] = React.useState<
    string | undefined
  >();
  const [reassignCard, setReassignCard] = React.useState<string | undefined>();
  const [editPhone, setEditPhone] = React.useState<Phone | undefined>();
  const [editCard, setEditCard] = React.useState<Card | undefined>();
  const [currentAsset, setCurrentAsset] = React.useState<AssetType>(
    AssetType.VEHICLE,
  );
  // Functions
  const closeModal = () => {
    setOpen(false);
    setEditVehicle(undefined);
    setEditPhone(undefined);
    setEditCard(undefined);
    setReassignPhone(undefined);
    setReassignVehicle(undefined);
    setReassignCard(undefined);
  };
  const addOrUpdateVehicle = (vehicle: Vehicle) => {
    if (!vehicle._id) {
      addVehicle(vehicle).then(() => {
        fetchVehicles();
        closeModal();
      });
    } else {
      updateVehicle(vehicle).then(() => {
        fetchVehicles();
        closeModal();
      });
    }
  };
  const addOrUpdatePhone = (phone: Phone) => {
    if (!phone._id) {
      addPhone(phone).then(() => {
        fetchPhones();
        closeModal();
      });
    } else {
      updatePhone(phone).then(() => {
        fetchPhones();
        closeModal();
      });
    }
  };
  const addOrUpdateCard = (card: Card) => {
    if (!card._id) {
      addCard(card).then(() => {
        fetchCards();
        closeModal();
      });
    } else {
      updateCard(card).then(() => {
        fetchCards();
        closeModal();
      });
    }
  };

  return (
    <div className="h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
      <Radio
        isWrapped={false}
        isHighlighted={true}
        options={[
          {
            text: <div className="flex">Vehicles</div>,
            onClick: () => {
              setCurrentAsset(AssetType.VEHICLE);
            },
          },
          {
            text: <div className="flex">Cards</div>,
            onClick: () => {
              setCurrentAsset(AssetType.CARD);
            },
          },
          {
            text: <div className="flex">Phones</div>,
            onClick: () => {
              setCurrentAsset(AssetType.PHONE);
            },
          },
        ]}
      />
      {currentAsset === AssetType.VEHICLE && (
        <>
          <div className="flex flex-row px-[24px] py-[16px] justify-between">
            <div className="flex font-airbnb font-black text-[24px]">
              Vehicles
            </div>
            <TailwindButton
              onClick={() => {
                setOpen(true);
              }}
              text="Add +"
            />
          </div>
          <div className="flex flex-col p-[8px]">
            {vehicles.map((vehicle) => (
              <IndividualVehicle
                key={vehicle._id}
                vehicle={vehicle}
                onClick={() => {
                  setEditVehicle(vehicle);
                }}
                reassignFunction={(vehicleId) => {
                  setReassignVehicle(vehicleId);
                }}
              />
            ))}
          </div>
          <AddOrUpdateVehicleModal
            open={open || !!editVehicle}
            closeCallback={() => {
              closeModal();
            }}
            cta={addOrUpdateVehicle}
            editVehicle={editVehicle}
          />
          {!!reassignVehicle && (
            <ReassignVehicleModal
              open={!!reassignVehicle}
              closeCallback={() => {
                closeModal();
              }}
              cta={async (asset) => {
                await assignVehicle(reassignVehicle, asset);
                closeModal();
                await fetchVehicles();
              }}
              roleToFilter={UserRoleEnum.DRIVER}
              assignmentHistory={
                vehicles.filter((v) => v._id === reassignVehicle)[0]
                  .assignmentHistory
              }
            />
          )}
        </>
      )}
      {currentAsset === AssetType.PHONE && (
        <>
          <div className="flex flex-row px-[24px] py-[16px] justify-between">
            <div className="flex font-airbnb font-black text-[24px]">
              Phones
            </div>
            <TailwindButton
              onClick={() => {
                setOpen(true);
              }}
              text="Add +"
            />
          </div>
          <div className="flex flex-col p-[8px]">
            {phones.map((phone) => (
              <IndividualPhone
                key={phone._id}
                phone={phone}
                onClick={() => {
                  setEditPhone(phone);
                }}
                reassignFunction={(vehicleId) => {
                  setReassignPhone(vehicleId);
                }}
              />
            ))}
          </div>
          <AddOrUpdatePhoneModal
            open={open || !!editPhone}
            closeCallback={() => {
              closeModal();
            }}
            cta={addOrUpdatePhone}
            editPhone={editPhone}
          />
          {!!reassignPhone && (
            <ReassignVehicleModal
              open={!!reassignPhone}
              closeCallback={() => {
                closeModal();
              }}
              cta={async (asset) => {
                await assignPhone(reassignPhone, asset);
                closeModal();
                await fetchPhones();
              }}
              assignmentHistory={
                phones.filter((p) => p._id === reassignPhone)[0]
                  .assignmentHistory
              }
            />
          )}
        </>
      )}
      {currentAsset === AssetType.CARD && (
        <>
          <div className="flex flex-row px-[24px] py-[16px] justify-between">
            <div className="flex font-airbnb font-black text-[24px]">Cards</div>
            <TailwindButton
              onClick={() => {
                setOpen(true);
              }}
              text="Add +"
            />
          </div>
          <div className="flex flex-col p-[8px]">
            {cards.map((card) => (
              <IndividualCard
                key={card._id}
                card={card}
                onClick={() => {
                  setEditCard(card);
                }}
                reassignFunction={(vehicleId) => {
                  setReassignCard(vehicleId);
                }}
              />
            ))}
          </div>
          <AddOrUpdateCardModal
            open={open || !!editCard}
            closeCallback={() => {
              closeModal();
            }}
            cta={addOrUpdateCard}
            editCard={editCard}
          />
          {!!reassignCard && (
            <ReassignVehicleModal
              open={!!reassignCard}
              closeCallback={() => {
                closeModal();
              }}
              cta={async (asset) => {
                await assignCard(reassignCard, asset);
                closeModal();
                await fetchCards();
              }}
              assignmentHistory={
                cards.filter((p) => p._id === reassignCard)[0].assignmentHistory
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default Assets;

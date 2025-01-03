"use client";
import React, { useState } from "react";
import CustomersList, { OfferList } from "./OfferList";
import { useTranslations } from "next-intl";
import { Button } from "@/components/page";
import { OfferForm } from "./Components/page";

export const OffersParent = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const t = useTranslations();

  return (
    <div className=" rounded-md ">
      {!showAddForm ? (
        <div className="lg:w-[1000px] w-[600px]">
          <div className="bg-white  p-3 rounded-md flex justify-between items-center ">
            <p className="font-semibold  text-lg">{t("sidebar.offers")} </p>
            <Button
              buttonSize="small"
              className="bg-primary text-white px-10"
              type="button"
              onClick={handleAddClick}
            >
              {t("add")}
            </Button>
          </div>
          <OfferList/>
        </div>
      ) : (
        <div className="lg:w-[1000px]">
          <div className="bg-white  p-3 rounded-md flex items-center mb-3">
            <p className="font-semibold  text-lg">
              {t("sidebar.offers")} {`>`} {t("add")}
            </p>
          </div>
          <OfferForm/>
        </div>
      )}
    </div>
  );
};

export default OffersParent;

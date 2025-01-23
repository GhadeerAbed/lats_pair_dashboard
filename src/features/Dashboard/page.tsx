"use client";
import React from "react";
import { Statistic } from "./components/page";
import BookingCalendar from "./components/BookingCalendar/page";


const MainDashboard = () => {
  return (
    <>
      <Statistic/>
      <BookingCalendar/>
    </>
  );
};

export default MainDashboard;

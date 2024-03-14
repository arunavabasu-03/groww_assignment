'use client';
import NavBar from "@/components/NavBar";
import OrderSummary from "@/components/OrderSummery";
import React from "react";

function page() {
  return (
    <div>
      <NavBar/>
      <OrderSummary />
    </div>
  );
}

export default page;

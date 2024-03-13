'use client';

import Address from "@/components/Address";
import OrderSummery from "@/components/OrderSummery";
import Payment from "@/components/Payment";
import React from "react";
import MultiStep from "react-multistep";

function page() {
  const steps = [
    { name: "Address ", component: <Address /> },
    { name: "Payment", component: <Payment /> },
    { name: "Order Summery", component: <OrderSummery /> },
  ];

  return (
    <div>
      <h1>React multi step</h1>
      <MultiStep steps={steps} />
    </div>
  );
}

export default page;

"use client";

import React, { useState } from "react";
import Address from "@/components/Address";

import Payment from "@/components/Payment";
import OrderSummery from "@/components/OrderSummery";
import ProgressBar from "@/components/Progress";
import NavBar from "@/components/NavBar";

function page() {
  const stepComponents = [<Address />, <Payment />, <OrderSummery />];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < stepComponents.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate progress
  const progressPercentage = ((currentStep + 1) / stepComponents.length) * 100;

  return (
    <div>
      <NavBar />
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Progress Bar */}
        <div
          style={{
            width: "50%",
            borderRadius: "5px",
            marginLeft: 40,
            marginRight: 40,
          }}
        >
          <ProgressBar currentStep={currentStep} />
        </div>

        {/* Render the current step component */}
        {stepComponents[currentStep]}

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {currentStep > 0 && (
            <div
              onClick={prevStep}
              style={{
                height: "200px",
                width: "200px",
              }}
            >
              Previous
            </div>
          )}
          {currentStep < stepComponents.length - 1 && (
            <button onClick={nextStep}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;

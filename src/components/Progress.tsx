import React from "react";

const steps = ["Address", "Payment Method", "OrderSummery"];

function ProgressBar({ currentStep }: any) {
  // Calculate the percentage of the completed steps
  const progressPercentage = ((currentStep / (steps.length - 1)) * 100).toFixed(
    2
  );

  return (
    <div style={{ padding: "20px 0" }}>
      {/* Step Labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {steps.map((step, index) => (
          <div
            key={step}
            style={{
              textAlign: "center",
              fontWeight: currentStep >= index ? "bold" : "normal",
            }}
          >
            {step}
          </div>
        ))}
      </div>
      {/* Progress Bar */}
      <div
        style={{
          height: "10px",
            backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        {/* Filled part */}
        <div
          style={{
            height: "100%",
            width: `${progressPercentage}%`,
            backgroundColor: "#007bff",
            borderRadius: "5px",
            transition: "width 0.3s",
          }}
        />
        {/* Step Markers */}
        {steps.map((step, index) => (
          <div
            key={step}
            style={{
              position: "absolute",
              top: "-5px",
              left: `${(index / (steps.length - 1)) * 100}%`,
              transform: "translateX(-50%)",
              height: "20px",
              width: "20px",
              backgroundColor: currentStep >= index ? "#007bff" : "#fff",
              border: "2px solid #007bff",
              borderRadius: "50%",
              zIndex: currentStep >= index ? "2" : "1",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;

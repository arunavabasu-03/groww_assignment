import React from "react";
import styles from "@/styles/sutotal.module.css";

function SubTotal() {
  return (
    <div className={styles.container}>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Summary
      </h1>
      <div
        style={{
          display: "flex",
          gap: 20,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <span>Sub Total</span>
          <span>$400</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <span>18% tax</span>
          <span>$20</span>
        </div>
        <div
          style={{
            height: "20px",
            width: "100%",
            borderTop: "1px solid lightgray", // This will create a top border acting as a divider
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <span>Total </span>
          <span>$420</span>
        </div>
      </div>
      <button
        style={{
          height: 48,
          width: "100%",
          borderRadius: 10,
          marginTop: 10,
          border: "none",
        }}
      >
        Make Payment{" "}
      </button>
    </div>
  );
}

export default SubTotal;

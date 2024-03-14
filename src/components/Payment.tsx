import React, { useState } from "react";
import styles from "@/styles/components/Payment.module.css"; // Ensure the path to your CSS module is correct

const PaymentScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleSelectPaymentMethod = (method: any) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className={styles.paymentScreen}>
      <div className={styles.paymentBox}>
        <h1 className={styles.title}>Payment method</h1>
        <p className={styles.subtitle}>Select your preferred payment method.</p>
        <form className={styles.form}>
          <label className={styles.option}>
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={selectedPaymentMethod === "paypal"}
              onChange={() => handleSelectPaymentMethod("paypal")}
            />
            PayPal
          </label>
          <label className={styles.option}>
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={selectedPaymentMethod === "stripe"}
              onChange={() => handleSelectPaymentMethod("stripe")}
            />
            Stripe
          </label>
          <button className={styles.continueButton} type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;

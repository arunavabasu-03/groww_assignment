// PaymentMethodsComponent.js

import { usePaymentMethodsStore } from "@/store/payment";
import React, { useEffect } from "react";
 // adjust the import path

const PaymentMethodsComponent = () => {
  const {
    paymentMethods,
    selectedPaymentMethod,
    fetchPaymentMethods,
    selectPaymentMethod,
    loading,
    error,
  } = usePaymentMethodsStore();

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Payment method</h2>
      {paymentMethods.map((method, index) => (
        <label key={index}>
          <input
            type="radio"
            name="paymentMethod"
            value={method}
            checked={selectedPaymentMethod === method}
            onChange={() => selectPaymentMethod(method)}
          />
          {method}
        </label>
      ))}
    </div>
  );
};

export default PaymentMethodsComponent;

import React from "react";
import { useStore } from "@/store/store";
import styles from "@/styles/components/sutotal.module.css"; // Ensure the path is correct

function SubTotal() {
  const cartTotal = useStore((state) => state.cartTotal);
  const taxAmount = useStore((state) => state.taxAmount);
  const finalTotal = useStore((state) => state.finalTotal);
  return (
    <div className={styles.container}>
      <h1 className={styles.summaryTitle}>Summary</h1>
      <div className={styles.itemContainer}>
        <div className={styles.itemRow}>
          <span>Sub Total</span>
          <span>${cartTotal().toFixed(2)}</span>
        </div>
        <div className={styles.itemRow}>
          <span>18% tax</span>
          <span>${taxAmount().toFixed(2)}</span>
        </div>
        <div className={styles.divider} />

        <div className={styles.itemRow}>
          <span>Total </span>
          <span>${finalTotal().toFixed(2)}</span>
        </div>
      </div>
      <button className={styles.paymentButton}>Proceed to Checkout</button>
    </div>
  );
}

export default SubTotal;

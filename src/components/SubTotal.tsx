import React from "react";
import styles from "@/styles/components/sutotal.module.css"; // Ensure the path is correct

function SubTotal() {
  return (
    <div className={styles.container}>
      <h1 className={styles.summaryTitle}>Summary</h1>
      <div className={styles.itemContainer}>
        <div className={styles.itemRow}>
          <span>Sub Total</span>
          <span>$400</span>
        </div>
        <div className={styles.itemRow}>
          <span>18% tax</span>
          <span>$20</span>
        </div>
        <div className={styles.divider} />

        <div className={styles.itemRow}>
          <span>Total </span>
          <span>$420</span>
        </div>
      </div>
      <button className={styles.paymentButton}>Make Payment</button>
    </div>
  );
}

export default SubTotal;

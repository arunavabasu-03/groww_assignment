import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import styles from "@/styles/components/sutotal.module.css";

function SubTotal() {
  const cartTotal = useCartStore((state) => state.cartTotal);
  const taxAmount = useCartStore((state) => state.taxAmount);
  const finalTotal = useCartStore((state) => state.finalTotal);
  const router = useRouter();

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
      <button
        className={styles.paymentButton}
        onClick={() => {
          router.push("/checkout");
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default SubTotal;

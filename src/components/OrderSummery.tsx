import Image from "next/image";
import styles from "@/styles/components/OrderSummery.module.css";
import { usePaymentMethodsStore } from "@/store/payment";
import { useAddressStore } from "@/store/address";

function OrderSummary() {
  const { selectedPaymentMethod } = usePaymentMethodsStore();
  const { address, city, pin } = useAddressStore();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order Summary</h1>
      <div className={styles.itemsContainer}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <div className={styles.subTotalContainer}>
        <div className={styles.subTotalRow}>
          <span>Sub Total</span>
          <span>$400</span>
        </div>
        <div className={styles.subTotalRow}>
          <span>18% tax</span>
          <span>$20</span>
        </div>
        <div className={styles.divider} />

        <div className={styles.subTotalRow}>
          <span>Total </span>
          <span>$420</span>
        </div>
        <div>{selectedPaymentMethod}</div>
        <h2>Delivery Detail</h2>
        <div>
          <span>📍</span>
          <span>
            {address}, {city}, {pin}
          </span>
        </div>
      </div>
    </div>
  );
}

function Product() {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemDetails}>
        <Image
          src={"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"}
          height={100}
          width={100}
          alt={"Pic"}
          className={styles.image}
        />
        <div>
          <p>Product Name</p>
          <p>Quantity: 2</p>
        </div>
      </div>
      <p>$40.00</p>
    </div>
  );
}

export default OrderSummary;

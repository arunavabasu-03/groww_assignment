import Image from "next/image";
import styles from "@/styles/components/OrderSummery.module.css";

function OrderSummary() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order Summary</h1>

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

      <div className={styles.subTotalContainer}>
        <h4>Sub Total</h4>
        <h4>$100</h4>
      </div>
    </div>
  );
}

export default OrderSummary;

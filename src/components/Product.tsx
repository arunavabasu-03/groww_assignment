import React from "react";
import styles from "@/styles/product.module.css";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
function Product() {
  return (
    <div className={styles.container}>
      <div className={styles.productContainer}>
        <Image
          src={"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"}
          height={100}
          width={100}
          alt={"Pic"}
          style={{
            borderRadius: 10,
            objectFit: "contain",
          }}
        />
        {/*product info*/}
        <div>
          <h1 className={styles.title}>Product Name</h1>
          <p>price</p>
          <div className={styles.quantity_container}>
            <Plus className={styles.button} />
            <p>4</p>
            <Minus className={styles.button} />
          </div>
        </div>
      </div>

      {/*Remove Item*/}
      <Trash2 style={{
        paddingRight:20
      }}/>
    </div>
  );
}

export default Product;

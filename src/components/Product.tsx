import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { Minus, Plus, Trash2 } from "lucide-react";
import styles from "@/styles/components/product.module.css";
interface TProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  addToCart: any;
  removeFromCart: any;
  removeEntireFromCart: any;
}

function Product({
  id,
  title,
  image,
  price,
  quantity,
  addToCart,
  removeFromCart,
  removeEntireFromCart,
}: TProductProps) {
  const removeFromCartNotify = () => toast.success("Item removed");
  const addtoCartNotify = () => toast.success("Item added");

  return (
    <div className={styles.container} key={id}>
      <div className={styles.productContainer}>
        <Image
          src={image}
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
          <h1 className={styles.title}>{title}</h1>
          <p>{price}</p>
          <div className={styles.quantity_container}>
            <Plus
              className={styles.button}
              onClick={() => {
                addToCart(id);
                addtoCartNotify();
              }}
            />
            <p>{quantity}</p>
            <Minus
              className={styles.button}
              onClick={() => {
                removeFromCart(id);
                removeFromCartNotify();
              }}
            />
          </div>
        </div>
      </div>

      {/*Remove Item*/}
      <Trash2
        style={{
          paddingRight: 10,
        }}
        onClick={() => {
          removeEntireFromCart(id);
          removeFromCartNotify();
        }}
      />
      <Toaster position="top-right" />
    </div>
  );
}

export default Product;

import Image from "next/image";
import Loading from "./Loading";
import EmptyCart from "./EmptyCart";
import { MapPin } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useUserInfoStore } from "@/store/userinfoStore";
import { usePaymentMethodsStore } from "@/store/paymentStore";
import styles from "@/styles/components/OrderSummery.module.css";

interface TProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

function OrderSummary() {
  const router = useRouter();

  const { products, loading, error } = useCartStore((state) => ({
    products: state.products,
    loading: state.loading,
    error: state.error,
  }));

  const cartTotal = useCartStore((state) => state.cartTotal);
  const taxAmount = useCartStore((state) => state.taxAmount);
  const finalTotal = useCartStore((state) => state.finalTotal);

  const { address, city, pin } = useUserInfoStore();
  const { selectedPaymentMethod } = usePaymentMethodsStore();

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (error) return <div>{error}</div>;

  if (products.length === 0)
    return (
      <div>
        <EmptyCart />.
      </div>
    );

  return (
    <div className={styles.container}>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Order Summary
      </h2>

      <div>
        <h4>Delivery Details</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
          }}
        >
          <MapPin />
          <span>
            {address}, {city}, {pin}
          </span>
        </div>
        <h4>Payment Method</h4>
        <div>{selectedPaymentMethod}</div>
        <h4>Products</h4>
        <div className={styles.itemsContainer}>
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              title={product.title}
            />
          ))}
        </div>
        <div className={styles.subTotalContainer}>
          <div className={styles.subTotalRow}>
            <span>Sub Total</span>
            <span>${cartTotal().toFixed(2)}</span>
          </div>
          <div className={styles.subTotalRow}>
            <span>18% tax</span>
            <span>${taxAmount().toFixed(2)}</span>
          </div>
          <div className={styles.divider} />

          <div className={styles.subTotalRow}>
            <span>Total </span>
            <span>${finalTotal().toFixed(2)}</span>
          </div>
          <button
            type="submit"
            className={styles.button}
            onClick={() => {
              router.push("/orderplaced");
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

function Product({ id, image, price, quantity, title }: TProductProps) {
  return (
    <div className={styles.itemContainer} key={id}>
      <div className={styles.itemDetails}>
        <Image
          src={image}
          height={100}
          width={100}
          alt={"Pic"}
          className={styles.image}
        />
        <div>
          <p className={styles.title}>{title}</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
      <p>${price}</p>
    </div>
  );
}

export default OrderSummary;

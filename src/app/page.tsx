"use client";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Product from "@/components/Product";
import SubTotal from "@/components/SubTotal";
import { useStore } from "@/store/cart";
import useThemeStore from "@/store/theme";
import styles from "@/styles/page.module.css";

function MyApp() {
  //@ts-ignore
  const { theme, setTheme } = useThemeStore();
  const {
    products,
    loading,
    error,
    fetchOrderDetails,
    removeFromCart,
    cartTotal,
    addToCart,
    removeEntireFromCart,
  } = useStore((state) => ({
    products: state.products,
    loading: state.loading,
    error: state.error,
    fetchOrderDetails: state.fetchOrderDetails,
    removeFromCart: state.removeFromCart,
    cartTotal: state.cartTotal,
    addToCart: state.addToCart,
    removeEntireFromCart: state.removeEntireFromCart,
  }));
  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  useEffect(() => {
    const fetchAndSetTheme = async () => {
      try {
        const response = await fetch(
          "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
        );
        const data = await response.json();
        setTheme(data.theme);
        document.body.style.backgroundColor = data.theme["--background"];
        document.body.style.color = data.theme["--foreground"];
        console.log(data.theme["--background"]);
      } catch (error) {
        console.error("Failed to fetch theme data:", error);
      }
    };

    fetchAndSetTheme();
  }, [setTheme]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.productContainer}>
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              title={product.title}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              removeEntireFromCart={removeEntireFromCart}
            />
          ))}
        </div>

        <SubTotal />
      </div>
    </div>
  );
}

export default MyApp;

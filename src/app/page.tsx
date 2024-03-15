"use client";
import { useEffect } from "react";

import NavBar from "@/components/NavBar";
import Product from "@/components/Product";
import SubTotal from "@/components/SubTotal";
import { useStore } from "@/store/cart";
import useThemeStore from "@/store/theme";

import { useFetchOrderDetails } from "@/hooks/useFetchOrderDetails";

import styles from "@/styles/page.module.css";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";

function MyApp() {
  //@ts-ignore

  const { theme, setTheme } = useThemeStore(); // setting the theme

  const {
    error,
    products,
    addToCart,
    removeFromCart,
    fetchOrderDetails,
    removeEntireFromCart,
  } = useStore((state) => ({
    error: state.error,
    products: state.products,
    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
    fetchOrderDetails: state.fetchOrderDetails,
    removeEntireFromCart: state.removeEntireFromCart,
  })); // getting the state from the store

  const { isLoading, isError } = useFetchOrderDetails();

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

  if (isLoading)
    return (
      <div>
        <NavBar />
        <Loading />
      </div>
    );

  if (isError) return <div>{error}</div>;

  if (products.length === 0)
    return (
      <div>
        <NavBar />
        <EmptyCart />
      </div>
    );

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

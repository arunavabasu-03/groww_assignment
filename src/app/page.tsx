"use client";
import React, { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import NavBar from "@/components/NavBar";
import useThemeStore from "@/store/themeStore";
import Loading from "@/components/Loading";
import Product from "@/components/Product";
import SubTotal from "@/components/SubTotal";
import styles from "@/styles/page.module.css";
import EmptyCart from "@/components/EmptyCart";
import { useFetchOrderDetails } from "@/hooks/useFetchOrderDetails";
import { useFetchTheme } from "@/hooks/useFetchTheme";

export default function Page() {
  const { theme, setTheme } = useThemeStore(); // setting the theme
  const { error, products, addToCart, removeFromCart, removeEntireFromCart } =
    useCartStore((state) => ({
      error: state.error,
      products: state.products,
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
      removeEntireFromCart: state.removeEntireFromCart,
    })); // getting the state from the store

  const { isLoading: isOrderLoading, isError: isOrderError } =
    useFetchOrderDetails();
  const { isLoading: isThemeLoading, isError: isThemeError } = useFetchTheme();


  React.useEffect(() => {
    document.body.style.backgroundColor = theme["--background"] || "";
    document.body.style.color = theme["--foreground"] || "";
  }, [theme]);

  if (isOrderLoading || isThemeLoading)
    return (
      <div>
        <NavBar />
        <Loading />
      </div>
    );

  if (isOrderError || isThemeError) return <div>{error}</div>;

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

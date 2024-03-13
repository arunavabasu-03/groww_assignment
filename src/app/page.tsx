"use client";
import NavBar from "@/components/NavBar";
import Product from "@/components/Product";
import SubTotal from "@/components/SubTotal";
import useThemeStore from "@/store/theme";
// import useStore from "@/store/store";
// import React, { useEffect } from "react";

// const ProductsComponent: React.FC = () => {
//   const {
//     products,
//     loading,
//     error,
//     fetchOrderDetails,
//     removeFromCart,
//     cartTotal,
//   } = useStore((state) => ({
//     products: state.products,
//     loading: state.loading,
//     error: state.error,
//     fetchOrderDetails: state.fetchOrderDetails,
//     removeFromCart: state.removeFromCart,
//     cartTotal: state.cartTotal,
//   }));

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [fetchOrderDetails]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (products.length === 0) return <div>Your cart is empty.</div>;

//   return (
//     <div>
//       <h1>Products</h1>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {products.map((product) => (
//           <div
//             key={product.id}
//             style={{ width: "200px", marginBottom: "20px" }}
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               style={{ width: "100%" }}
//             />
//             <h2>{product.title}</h2>
//             <p>${product.price}</p>
//             <p>Quantity: {product.quantity}</p>
//             <button onClick={() => removeFromCart(product.id)}>
//               Remove from Cart
//             </button>
//           </div>
//         ))}
//       </div>
//       <h2>Total: ${cartTotal().toFixed(2)}</h2>
//     </div>
//   );
// };

// export default ProductsComponent;

// pages/_app.js
import { useEffect } from "react";
// Adjust the path as needed

function MyApp() {
  //@ts-ignore
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const fetchAndSetTheme = async () => {
      try {
        const response = await fetch(
          "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
        );
        const data = await response.json();
        setTheme(data.theme); // Update the theme in the Zustand store
        // Apply the theme colors to the body
        document.body.style.backgroundColor = data.theme["--background"];
        document.body.style.color = data.theme["--foreground"];
        console.log(data.theme["--background"]);
      } catch (error) {
        console.error("Failed to fetch theme data:", error);
      }
    };

    fetchAndSetTheme();
  }, [setTheme]);

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Product />
        </div>

        <SubTotal />
      </div>
    </div>
  );
}

export default MyApp;

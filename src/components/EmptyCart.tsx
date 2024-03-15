import { CircleOff } from "lucide-react";

function EmptyCart() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "80vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircleOff
          style={{
            color: "red",
            fontWeight: "bold",
            height: 100,
            width: 100,
          }}
        />
        <h4>Opps!! your cart is empty .</h4>
      </div>
    </div>
  );
}

export default EmptyCart;

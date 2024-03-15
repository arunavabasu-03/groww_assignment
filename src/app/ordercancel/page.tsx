import NavBar from "@/components/NavBar";
import {  CircleX } from "lucide-react";

function page() {
  return (
    <div>
      <NavBar />
      <div
        style={{
          height: "86vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircleX
          style={{
            color: "red",
            fontWeight: "bold",
            height: 100,
            width: 100,
          }}
        />
        <h4>🎉 Oops!! Your Order is cancelled.</h4>
      </div>
    </div>
  );
}

export default page;

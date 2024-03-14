import NavBar from "@/components/NavBar";
import { CheckCircle } from "lucide-react";
import React from "react";

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
        <CheckCircle
          style={{
            color: "#50C878",
            fontWeight: "bold",
            height: 100,
            width:100
            
          }}
        />
        <h4>🎉 Congrats!! Your Order is placed.</h4>
      </div>
    </div>
  );
}

export default page;

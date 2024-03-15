import Image from "next/image";
import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <div>
      <nav>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Link href={'/'}>
            <Image
              src={"https://groww.in/groww-logo-270.png"}
              height={50}
              width={50}
              alt="Groww Logo"
            />
          </Link>
          <h1>Groww</h1>
        </div>
        <div
          style={{
            height: "20px",
            width: "100%",
            borderTop: "1px solid lightgray", 
          }}
        />
      </nav>
    </div>
  );
}

export default NavBar;

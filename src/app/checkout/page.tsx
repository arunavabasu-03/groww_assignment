"use client";
import NavBar from "@/components/NavBar";
import UserInfoForm from "@/components/UserInfo";

function page() {
  return (
    <div>
      <NavBar/>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserInfoForm />
      </div>
    </div>
  );
}

export default page;

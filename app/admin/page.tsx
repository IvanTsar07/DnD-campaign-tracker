import ComingSoon from "@/components/common/coming-soon/coming-soon";
import React from "react";

const AdminPage = async () => {
  // const response = await fetch(
  //   `https://dnd-track-app-default-rtdb.europe-west1.firebasedatabase.app/users/${"Tlm401ccS9SEM01ipRa57q0XJvB2"}.json`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  // const re = await response.json();

  return (
    <div>
      <ComingSoon />
    </div>
  );
};

export default AdminPage;

import React from "react";
import { useAuthContext } from "@/lib/providers/auth-provider";

const AdminPage = async () => {
  const response = await fetch(
    `https://dnd-track-app-default-rtdb.europe-west1.firebasedatabase.app/users/${"Tlm401ccS9SEM01ipRa57q0XJvB2"}.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const re = await response.json();

  console.log(re);

  return <div>AdminPage</div>;
};

export default AdminPage;

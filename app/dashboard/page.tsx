import { getNPCs } from "@/lib/firebase/firestore";
import React from "react";

const DashboardPage = async () => {
  const data = await getNPCs();

  console.log(data);

  return <div>DashboardPage</div>;
};

export default DashboardPage;

import { getArtefacts } from "@/lib/firebase/firestore";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TablePagination,
} from "@mui/material";
import React from "react";
import Row from "./components/table-row";
import TableHeadComponent from "./components/table-head";
import TableData from "./components/table-data";

const LootPage = async () => {
  const data = await getArtefacts();

  return (
    <div>
      <TableData data={data} />
    </div>
  );
};

export default LootPage;

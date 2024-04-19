"use client";

import { TableHead, TableRow, TableSortLabel } from "@mui/material";
import StyledTableCell from "./table-styled-cell";
import React, { FC } from "react";

type Order = "asc" | "desc";

export type TableHeadProps = {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: "name" | "source" | "owner" | "tuning"
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

const TableHeadComponent: FC<TableHeadProps> = ({
  numSelected,
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
  rowCount,
}) => {
  const createSortHandler =
    (property: "name" | "source" | "owner" | "tuning") =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell />
        <StyledTableCell sortDirection={orderBy === "name" ? order : false}>
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "desc"}
            onClick={createSortHandler("name")}
          >
            {"Artefact"}
          </TableSortLabel>
        </StyledTableCell>
        <StyledTableCell align="right">Description</StyledTableCell>
        <StyledTableCell
          sortDirection={orderBy === "source" ? order : false}
          align="right"
        >
          Source
        </StyledTableCell>
        <StyledTableCell
          sortDirection={orderBy === "owner" ? order : false}
          align="right"
        >
          Owner
        </StyledTableCell>
        <StyledTableCell
          sortDirection={orderBy === "tuning" ? order : false}
          align="right"
        >
          Tuning
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;

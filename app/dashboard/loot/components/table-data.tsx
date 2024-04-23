"use client";

import React, { FC, useMemo, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import Row from "./table-row";
import TableHeadComponent from "./table-head";
import { ArtefactModel } from "@/models/artefact";
import { Search } from "@mui/icons-material";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = "asc" | "desc";

const TableData: FC<{ data: ArtefactModel[] }> = ({ data }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<
    "name" | "source" | "owner" | "tuning"
  >("name");

  const [searchString, setSearchString] = useState("");

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: "name" | "source" | "owner" | "tuning"
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = useMemo(() => {
    const filteredData = data.filter(artefact => {
      return `${artefact.name}__${artefact.owner}`.includes(searchString);
    });

    return stableSort(filteredData, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, data, searchString]);

  return (
    <>
      <div style={{ marginBottom: "24px", padding: "0px 24px" }}>
        <TextField
          id="serch-filed"
          label="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
        />
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHeadComponent
            numSelected={0}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={() => {}}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {visibleRows.map(row => (
              <Row
                key={row.id}
                row={row}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableData;

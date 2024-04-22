"use client";

import { ArtefactModel } from "@/models/artefact";
import { InsertLink, OpenInNew } from "@mui/icons-material";
import { TableRow, TableCell } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const Row: FC<{ row: ArtefactModel }> = ({ row }) => {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell align="center">
        {row.original_url && (
          <Link
            href={row.original_url}
            target="_blank"
          >
            <OpenInNew
              color="primary"
              fontSize="small"
              style={{ verticalAlign: "middle" }}
            />
          </Link>
        )}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
      >
        {row.name}
      </TableCell>
      <TableCell align="right">{row.short_description}</TableCell>
      <TableCell align="right">{row.source}</TableCell>
      <TableCell align="right">{row.owner}</TableCell>
      <TableCell
        align="right"
        title={row.tuning ? "Need tuning" : undefined}
      >
        {row.tuning ? <InsertLink /> : ""}
      </TableCell>
    </TableRow>
  );
};

export default Row;

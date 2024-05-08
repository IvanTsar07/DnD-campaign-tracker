"use client";

import useAuth from "@/lib/hooks/useAuth";
import { ArtefactModel } from "@/models/artefact";
import { Edit, InsertLink, MoreVert, OpenInNew } from "@mui/icons-material";
import {
  TableRow,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";

const Row: FC<{ row: ArtefactModel }> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const anchorRef = useRef(null);

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
      {user && (
        <TableCell style={{ position: "relative" }}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={() => setOpen(true)}
            ref={anchorRef}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorRef.current}
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            open={open}
            onClose={() => setOpen(false)}
          >
            <MenuItem
              onClick={() => {
                router.push(`/dashboard/loot/edit?id=${row.id}`);
              }}
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          </Menu>
        </TableCell>
      )}
    </TableRow>
  );
};

export default Row;

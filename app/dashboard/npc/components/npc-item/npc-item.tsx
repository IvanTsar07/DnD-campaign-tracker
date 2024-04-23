"use client";

import React, { FC, useContext } from "react";

import { NpcModel } from "@/models/npc";
import Image from "next/image";
import { Share } from "@mui/icons-material";
import Link from "next/link";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { CustomThemeContext } from "@/theme";

export type NpcItemProps = {
  npc: NpcModel;
};

const NpcItem: FC<NpcItemProps> = ({ npc }) => {
  const { currentTheme } = useContext(CustomThemeContext);
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        href={`/dashboard/npc/${npc.id}`}
        style={{ textDecoration: "none" }}
      >
        <CardHeader
          title={npc.name}
          subheader={npc.race}
          titleTypographyProps={{
            color:
              currentTheme === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black,
          }}
        />
      </Link>
      <div
        style={{
          minWidth: "345px",
          width: "100%",
          height: "400px",
          position: "relative",
        }}
      >
        <Link href={`/dashboard/npc/${npc.id}`}>
          <Image
            // TODO: rework in Firebase to null
            src={
              npc.image_url === "-" ? "/images/no_image.jpeg" : npc.image_url
            }
            alt={npc.name}
            fill
          />
        </Link>
      </div>
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {npc.notes}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NpcItem;

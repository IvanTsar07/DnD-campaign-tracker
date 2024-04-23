import React, { FC } from "react";

import classes from "./npc-item.module.css";
import { NpcModel } from "@/models/npc";
import Image from "next/image";
import { Favorite, Share } from "@mui/icons-material";
import Link from "next/link";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";

export type NpcItemProps = {
  npc: NpcModel;
};

const NpcItem: FC<NpcItemProps> = ({ npc }) => {
  return (
    // <div className={classes.card}>
    //   <header className={classes.header}>
    //     <div className={classes.title}>
    //       <h5>
    //         <Link href={`/dashboard/npc/${npc.id}`}>{npc.name}</Link>
    //       </h5>
    //     </div>
    //     <div className={classes.subtitle}>
    //       <p>{npc.race}</p>
    //     </div>
    //   </header>
    //   <div className={classes.media}>
    //     <Link href={`/dashboard/npc/${npc.id}`}>
    //       <Image
    //         // TODO: rework in Firebase to null
    //         src={
    //           npc.image_url === "-" ? "/images/no_image.jpeg" : npc.image_url
    //         }
    //         alt={npc.name}
    //         width={300}
    //         height={400}
    //         style={{ width: "100%" }}
    //       />
    //     </Link>
    //   </div>
    //   <div className={classes.content}>{npc.notes}</div>
    //   <div className={classes.footer}>
    //     <Share />
    //   </div>
    // </div>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={npc.name}
        subheader={npc.race}
      />
      <div
        style={{
          minWidth: "345px",
          width: "100%",
          height: "400px",
          position: "relative",
        }}
      >
        <Image
          // TODO: rework in Firebase to null
          src={npc.image_url === "-" ? "/images/no_image.jpeg" : npc.image_url}
          alt={npc.name}
          fill
        />
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

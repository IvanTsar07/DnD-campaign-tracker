import React, { FC } from "react";

import classes from "./npc-item.module.css";
import { NpcModel } from "@/models/npc";
import Image from "next/image";
import { Favorite, Share } from "@mui/icons-material";

export type NpcItemProps = {
  npc: NpcModel;
};

const NpcItem: FC<NpcItemProps> = ({ npc }) => {
  return (
    <div className={classes.card}>
      <header className={classes.header}>
        <div className={classes.title}>
          <h5>{npc.name}</h5>
        </div>
        <div className={classes.subtitle}>
          <p>{npc.race}</p>
        </div>
      </header>
      <div className={classes.media}>
        <Image
          // TODO: rework in Firebase to null
          src={npc.image_url === "-" ? "/images/no_image.jpeg" : npc.image_url}
          alt={npc.name}
          width={300}
          height={400}
          style={{ width: "100%" }}
        />
      </div>
      <div className={classes.content}>{npc.notes}</div>
      <div className={classes.footer}>
        <Favorite />
        <Share />
      </div>
    </div>
  );
};

export default NpcItem;
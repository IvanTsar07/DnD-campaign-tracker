import React, { FC } from "react";

import classes from "./npc-item.module.css";
import { NpcModel } from "@/models/npc";
import Image from "next/image";
import { Share } from "@mui/icons-material";
import Link from "next/link";

export type NpcItemProps = {
  npc: NpcModel;
};

const NpcItem: FC<NpcItemProps> = ({ npc }) => {
  return (
    <div className={classes.card}>
      <header className={classes.header}>
        <div className={classes.title}>
          <h5>
            <Link href={`/dashboard/npc/${npc.id}`}>{npc.name}</Link>
          </h5>
        </div>
        <div className={classes.subtitle}>
          <p>{npc.race}</p>
        </div>
      </header>
      <div className={classes.media}>
        <Link href={`/dashboard/npc/${npc.id}`}>
          <Image
            // TODO: rework in Firebase to null
            src={
              npc.image_url === "-" ? "/images/no_image.jpeg" : npc.image_url
            }
            alt={npc.name}
            width={300}
            height={400}
            style={{ width: "100%" }}
          />
        </Link>
      </div>
      <div className={classes.content}>{npc.notes}</div>
      <div className={classes.footer}>
        {/* <Favorite /> */}
        <Share />
      </div>
    </div>
  );
};

export default NpcItem;

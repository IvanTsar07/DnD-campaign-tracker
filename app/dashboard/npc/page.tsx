import { getNPCs } from "@/lib/firebase/firestore";
import {
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Image from "next/image";

const NpcMainPage = async () => {
  const data = await getNPCs();

  data.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main>
      <h1>NPCs</h1>
      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "40px",
          padding: "20px 64px",
        }}
      >
        {data.map(npc => (
          <Card
            sx={{ maxWidth: 400, minWidth: 400 }}
            key={npc.id}
          >
            <CardHeader
              title={npc.name}
              subheader={npc.race}
            />
            <CardMedia>
              <Image
                // TODO: rework in Firebase to null
                src={
                  npc.image_url === "-"
                    ? "/images/no_image.jpeg"
                    : npc.image_url
                }
                alt={npc.name}
                width={300}
                height={400}
                style={{ width: "100%" }}
              />
            </CardMedia>
            <CardContent>
              <div style={{ fontSize: 14, color: "rgba(255,255,255, 0.7)" }}>
                {npc.notes}
              </div>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default NpcMainPage;

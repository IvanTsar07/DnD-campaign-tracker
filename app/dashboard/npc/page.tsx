import { getNPCs } from "@/lib/firebase/firestore";
import { ExpandMore } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";

const NpcMainPage = async () => {
  const data = await getNPCs();

  data.sort((a, b) => a.name.localeCompare(b.name));

  console.log(data);

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
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {npc.notes}
              </Typography>
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

import { getNPC } from "@/lib/firebase/firestore";
import { Grid, Paper, Typography, styled } from "@mui/material";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { Item } from "../components/npn-details/grid-item/grid-item";
import DetailsItem from "../components/npn-details/details-item/details-item";

type NpcDetailsPageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const NpcDetailsPage: FC<NpcDetailsPageProps> = async ({ params }) => {
  const npcId = params.slug;
  const npc = await getNPC(npcId);

  console.log(npc);

  if (!npc) {
    redirect("/not-foud");
  }

  return (
    <>
      <Typography
        variant="h1"
        align="center"
      >
        {npc.name}
      </Typography>

      <div
        style={{
          maxWidth: "500px",
          height: "700px",
          position: "relative",
          margin: "0 auto",
          marginBottom: "48px",
        }}
      >
        <Image
          src={npc.image_url}
          alt={npc.name}
          sizes="100%"
          fill
          layout="fill"
        />
      </div>

      <Grid
        container
        spacing={2}
        sx={{ flexGrow: 1 }}
        alignItems={"baseline"}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ flexGrow: 1 }}
        >
          <Item>
            <DetailsItem
              caption={"Details"}
              text={npc.details}
            />
            <DetailsItem
              caption={"Relations"}
              text={npc.relations}
            />
            <DetailsItem
              caption={"Notes"}
              text={npc.notes}
            />
          </Item>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ flexGrow: 1 }}
        >
          <Item sx={{ flexGrow: 1 }}>
            <DetailsItem
              caption={"City/Organization"}
              text={npc.city_org}
            />
            <DetailsItem
              caption={"Status"}
              text={npc.status}
            />
            <DetailsItem
              caption={"Race"}
              text={npc.race}
            />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default NpcDetailsPage;

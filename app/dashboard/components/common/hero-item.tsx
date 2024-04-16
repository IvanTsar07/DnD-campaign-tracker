import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import { HeroData } from "@/dashboard/hero-data";
import Image from "next/image";

export type HeroItemProps = {
  direction: "row" | "row-reverse";
  hero: HeroData;
};

const HeroItem: FC<HeroItemProps> = ({ direction = "row", hero }) => {
  return (
    <Box
      key={hero.name}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: direction,
      }}
    >
      <Image
        src={hero.imageUrl}
        alt={hero.name}
        width={300}
        height={300}
      />
      <Box style={{ maxWidth: 400 }}>
        <Typography variant="h5">{`${hero.name} (${hero.realname})`}</Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color="GrayText"
        >
          {hero.race}
        </Typography>

        <Typography variant="body1">{hero.description}</Typography>
      </Box>
    </Box>
  );
};

export default HeroItem;

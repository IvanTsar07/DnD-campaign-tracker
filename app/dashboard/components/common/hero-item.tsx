import { FC } from "react";
import type { HeroData } from "@/dashboard/hero-data";
import Image from "next/image";
import { Typography } from "@mui/material";

export type HeroItemProps = {
  direction: "row" | "row-reverse";
  hero: HeroData;
};

const HeroItem: FC<HeroItemProps> = ({ direction = "row", hero }) => {
  return (
    <div
      key={hero.name}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: direction,
        gap: "40px",
        marginBottom: "48px",
      }}
    >
      <Image
        src={hero.imageUrl}
        alt={hero.name}
        width={300}
        height={300}
      />
      <div style={{ maxWidth: 400 }}>
        <h5
          style={{ marginBottom: 4, fontSize: 20 }}
        >{`${hero.name} (${hero.realname})`}</h5>
        <Typography
          variant="subtitle1"
          style={{
            fontSize: 13,
            marginBottom: 8,
          }}
        >
          {hero.race}
        </Typography>

        <Typography variant="body1">{hero.description}</Typography>
      </div>
    </div>
  );
};

export default HeroItem;

import { FC } from "react";
// import Typography from "@mui/material/Typography";
import type { HeroData } from "@/dashboard/hero-data";
import Image from "next/image";

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
      <div style={{ maxWidth: 400, color: "#FFFFFF" }}>
        <h5
          style={{ marginBottom: 4, fontSize: 20 }}
        >{`${hero.name} (${hero.realname})`}</h5>
        <div
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 13,
            marginBottom: 8,
          }}
        >
          {hero.race}
        </div>

        <div>{hero.description}</div>
      </div>
    </div>
  );
};

export default HeroItem;

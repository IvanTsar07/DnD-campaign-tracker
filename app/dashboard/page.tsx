import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { HERO_DATA } from "./hero-data";
import HeroItem from "./components/common/hero-item";

const DashboardPage = async () => {
  return (
    <>
      <Typography
        variant="h3"
        style={{ textAlign: "center", marginBottom: "48px" }}
      >
        Вітаємо в кампанії &quot;Справи баронські&quot;!
      </Typography>

      <Box
        component="div"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Image
          src={"/images/campaing_image.jpg"}
          alt={"Campaing image"}
          width={500}
          height={500}
        />
      </Box>

      <section>
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            marginBottom: "48px",
            marginTop: "72px",
          }}
        >
          Знайомтеся з нашими персонажами
        </Typography>

        <Box
          component="div"
          style={{ width: "60%", margin: "0 auto" }}
        >
          {HERO_DATA.map((hero, idx) => {
            return (
              <HeroItem
                key={hero.name}
                direction={idx % 2 === 0 ? "row" : "row-reverse"}
                hero={hero}
              />
            );
          })}
        </Box>
      </section>
    </>
  );
};

export default DashboardPage;

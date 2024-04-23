import Image from "next/image";
// import { HERO_DATA } from "./hero-data";
// import HeroItem from "./components/common/hero-item";

import classes from "./page.module.css";
//import { Typography } from "@mui/material";

const DashboardPage = () => {
  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: "48px", fontSize: 32 }}>
        Вітаємо в кампанії &quot;Справи баронські&quot;!
      </h3>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Image
          src={"/images/campaing_image.jpg"}
          alt={"Campaing image"}
          width={500}
          height={500}
        />
      </div>

      <section className={classes.campaignHeroesContainer}>
        {/* <Typography
          variant="h4"
          style={{
            textAlign: "center",
            marginBottom: "48px",
            marginTop: "72px",
            fontSize: "24px",
          }}
        >
          Знайомтеся з нашими персонажами
        </Typography> */}

        {/* <div style={{ margin: "0 auto" }}>
          {HERO_DATA.map((hero, idx) => {
            return (
              <HeroItem
                key={hero.name}
                direction={idx % 2 === 0 ? "row" : "row-reverse"}
                hero={hero}
              />
            );
          })}
        </div> */}
      </section>
    </>
  );
};

export default DashboardPage;

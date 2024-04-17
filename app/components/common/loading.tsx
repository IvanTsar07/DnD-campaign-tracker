import Image from "next/image";
import React from "react";

import classes from "./loading.module.css";

const Loading = () => {
  return (
    <section className={classes.loading}>
      <Image
        src={"/images/logo.svg"}
        alt={"Logo"}
        width={400}
        height={400}
        className={classes.logo}
      />
    </section>
  );
};

export default Loading;

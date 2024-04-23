import Image from "next/image";
import React, { useContext } from "react";

import classes from "./page-logo.module.css";
import { CustomThemeContext } from "@/lib/providers/theme-provider";

const PageLogo = () => {
  const { currentTheme } = useContext(CustomThemeContext);

  return (
    <Image
      src={
        currentTheme === "dark" ? "/images/logo.svg" : "/images/logo-dark.svg"
      }
      alt="DnD Tracker Logo"
      width={200}
      height={200}
      className={classes.logo}
      data-theme={currentTheme}
    />
  );
};

export default PageLogo;

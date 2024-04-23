import { Typography } from "@mui/material";
import { FC } from "react";

import classes from "./details-item.module.css";

type DetailsItem = {
  caption: string;
  text: string;
};

const DetailsItem: FC<DetailsItem> = ({ caption, text }) => {
  return (
    <div className={classes.detailsItem}>
      <Typography
        variant="caption"
        marginInlineEnd={2}
        style={{ minWidth: "120px" }}
        align="left"
      >
        {caption}:{" "}
      </Typography>
      <Typography align="left">{text}</Typography>
    </div>
  );
};

export default DetailsItem;

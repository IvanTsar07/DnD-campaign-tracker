"use client";

import Image from "next/image";
import classes from "./page.module.css";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className={classes.main}>
      <Box
        component="div"
        className={classes.mainBox}
      >
        <Image
          src="/images/logo.svg"
          alt="DnD Tracker Logo"
          width={200}
          height={200}
          className={classes.logo}
        />

        <Typography
          variant="h2"
          className={classes.welcome}
        >
          Welcome to DnD Tracker Application!
        </Typography>

        <section
          style={{ width: "100%" }}
          className={classes.actions}
        >
          <Button
            variant="contained"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </Button>
        </section>
      </Box>
    </main>
  );
}

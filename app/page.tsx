"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

import classes from "./page.module.css";
import { useAuthContext } from "./lib/providers/auth-provider";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

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
            endIcon={<ArrowForward />}
            style={{ background: "#FFFFFF" }}
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>

          {/* TODO: make sign up page for registering  */}

          {/* <Button
            variant="contained"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </Button> */}
        </section>
      </Box>
    </main>
  );
}

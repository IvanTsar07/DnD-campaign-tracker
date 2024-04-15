"use client";

import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Image from "next/image";

import classes from "./page.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormState } from "react-dom";
import { signIn } from "@/lib/api/actions";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useFormState<{ message: string | undefined }>(
    signIn,
    {
      message: null,
    }
  );

  const handleClickShowPassword = () => setShowPassword(show => !show);

  return (
    <main className={classes.login}>
      <Image
        src="/images/logo.svg"
        alt="DnD Tracker Logo"
        width={200}
        height={200}
        className={classes.logo}
      />

      <form
        action={formAction}
        className={classes.loginForm}
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          className={classes.loginFormInput}
          InputProps={{
            name: "email",
          }}
        />

        <FormControl
          variant="outlined"
          className={classes.loginFormInput}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          className={classes.loginFormButton}
        >
          Login
        </Button>
      </form>
    </main>
  );
};

export default LoginPage;

"use client";

import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "@/lib/api/actions";

import classes from "./page.module.css";
import { signInWithEmailAndPassword } from "@/lib/firebase/auth";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { redirect } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const user = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const onSubmit: SubmitHandler<Inputs> = async data => {
    // const result = await signIn(data.email, data.password);
    await signInWithEmailAndPassword(data.email, data.password);

    // TODO: Handle error & rework error handling

    // if (result && result.error) {
    //   setError("email", { type: "manual", message: result.error });
    //   setError("password", { type: "manual", message: result.error });
    // }
  };

  // TODO: Add loading state & rework input components to make more controls

  console.log(user);

  if (user) {
    return redirect("/dashboard");
  }

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
        onSubmit={handleSubmit(onSubmit)}
        className={classes.loginForm}
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          className={classes.loginFormInput}
          InputProps={{
            ...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            }),
            autoComplete: "email",
          }}
          error={Boolean(errors.email)}
          helperText={errors.email ? "Invalid email" : ""}
        />

        <FormControl
          variant="outlined"
          className={classes.loginFormInput}
          error={Boolean(errors.password)}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            {...register("password", { required: true, minLength: 6 })}
            id="password"
            type={showPassword ? "text" : "password"}
            error={Boolean(errors.password)}
            autoComplete="password"
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
          {Boolean(errors.password) && (
            <FormHelperText id="my-helper-text">
              Invalid Password
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          variant="body1"
          gutterBottom
        ></Typography>

        <Button
          variant="contained"
          type="submit"
          className={classes.loginFormButton}
          size="large"
        >
          Login
        </Button>
      </form>
    </main>
  );
};

export default LoginPage;

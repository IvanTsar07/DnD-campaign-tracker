"use client";

import React, { FC } from "react";
import classes from "./artefact-form.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Inputs } from "../types";

type ArtefactFormProps = {
  onSubmit: SubmitHandler<Inputs>;
  loading: boolean;
  submitError: boolean;
  defaultValues?: Inputs;
};

const ArtefactForm: FC<ArtefactFormProps> = ({
  onSubmit,
  loading,
  submitError,
  defaultValues,
}) => {
  console.log(defaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<Inputs>({ defaultValues: defaultValues });

  console.log("TUNING >>>>>> ", getValues().tuning);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.createForm}
      >
        <TextField
          id="name"
          label="Artefact Name"
          variant="outlined"
          disabled={loading}
          InputProps={{
            ...register("name", {
              required: true,
            }),
          }}
          error={Boolean(errors.name)}
          helperText={errors.name ? "Invalid artefact name" : ""}
          fullWidth
          className={classes.field}
        />
        <TextField
          id="original_url"
          label="Original URL"
          variant="outlined"
          disabled={loading}
          InputProps={{
            ...register("original_url", {}),
          }}
          error={Boolean(errors.name)}
          helperText={errors.name ? "Invalid url" : ""}
          fullWidth
          className={classes.field}
        />
        <TextField
          id="source"
          label="Source"
          variant="outlined"
          disabled={loading}
          InputProps={{
            ...register("source", {
              required: true,
            }),
          }}
          error={Boolean(errors.name)}
          helperText={errors.name ? "Invalid source" : ""}
          fullWidth
          className={classes.field}
        />
        <TextField
          id="owner"
          label="Owner"
          variant="outlined"
          disabled={loading}
          InputProps={{
            ...register("owner", {
              required: true,
            }),
          }}
          error={Boolean(errors.name)}
          helperText={errors.name ? "Invalid owner" : ""}
          fullWidth
          className={classes.field}
        />

        <TextField
          id="short_description"
          label="Short Description"
          disabled={loading}
          multiline
          fullWidth
          InputProps={{
            ...register("short_description", {}),
          }}
          rows={4}
          className={classes.field}
        />

        {/* <FormControlLabel
          control={<Checkbox />}
          label="Tuning?"
          disabled={loading}
          className={classes.checkbox}
          {...register("tuning")}
          onChange={() => {
            setValue("tuning", !getValues().tuning);
          }}
          value={getValues().tuning}
          defaultChecked={Boolean(defaultValues?.tuning)}
        /> */}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Typography>Without Tuning</Typography>
          <Switch
            {...register("tuning")}
            defaultChecked={Boolean(defaultValues?.tuning)}
          />
          <Typography>With Tuning</Typography>
        </Stack>

        {submitError && <p>Something went wrong. Please try again later</p>}

        <div className={classes.actionContainer}>
          <Button
            disabled={loading}
            variant="contained"
            type="submit"
            className={classes.loginFormButton}
            size="large"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default ArtefactForm;

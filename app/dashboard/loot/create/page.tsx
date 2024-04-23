"use client";

import React, { useState } from "react";
import Image from "next/image";
import classes from "./page.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Art, ArtefactModelInput } from "@/models/artefact";
import { createArtefact } from "@/lib/firebase/firestore";
import { useRouter } from "next/navigation";
import PageLogo from "@/components/common/page-logo/page-logo";

type Inputs = {
  name: string;
  original_url: string;
  short_description: string;
  source: string;
  tuning: boolean;
  owner: string;
};

const CreateArtefactPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { name, original_url, short_description, source, tuning, owner } =
      data;

    setLoading(true);

    const art: ArtefactModelInput = {
      name,
      original_url,
      short_description,
      source,
      tuning,
      owner,
    };

    const result = await createArtefact(art);

    if (result) {
      console.log("Art created", result);
      setLoading(false);

      router.replace("/dashboard/loot");
    } else {
      setSubmitError(true);

      setLoading(false);
    }
  };
  return (
    <section>
      <PageLogo />

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

        <FormControlLabel
          control={<Checkbox />}
          label="Tuning?"
          {...register("tuning")}
          className={classes.checkbox}
        />

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
    </section>
  );
};

export default CreateArtefactPage;

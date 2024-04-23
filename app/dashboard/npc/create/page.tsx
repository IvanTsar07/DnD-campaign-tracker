"use client";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./page.module.css";
import { Button, MenuItem, TextField } from "@mui/material";
import { NpcModel, NpcModelInput } from "@/models/npc";
import { createNPC } from "@/lib/firebase/firestore";
import { useState } from "react";
import { redirect } from "next/navigation";
import PageLogo from "@/components/common/page-logo/page-logo";

type Inputs = {
  name: string;
  imageUrl: string;
  race: string;
  city_organization: string;
  notes: string;
  relations: string;
  status: string;
  details: string;
};

const statuses = [
  {
    value: "living",
    label: "Живий",
  },
  {
    value: "dead",
    label: "Мертвий",
  },
  {
    value: "unknown",
    label: "Невідомо",
  },
];

const NpcCreationPage = () => {
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true);

    const {
      name,
      imageUrl,
      race,
      city_organization,
      notes,
      relations,
      status,
      details,
    } = data;

    const npcStatus = statuses.find(s => s.value === status);

    const npc: NpcModelInput = {
      name,
      image_url: imageUrl,
      race,
      city_org: city_organization,
      notes,
      relations,
      status: npcStatus?.label || "unknown",
      details,
    };

    const result = await createNPC(npc);

    if (result) {
      console.log("NPC created", result);
      setLoading(false);

      redirect("/dashboard/npc");
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
          label="NPC Name"
          variant="outlined"
          disabled={loading}
          InputProps={{
            ...register("name", {
              required: true,
            }),
          }}
          error={Boolean(errors.name)}
          helperText={errors.name ? "Invalid name" : ""}
          fullWidth
          className={classes.field}
        />
        <TextField
          id="imageUrl"
          label="Image URL"
          variant="outlined"
          disabled={loading}
          placeholder="https://s3.resci.pro/image.jpg"
          InputProps={{
            ...register("imageUrl", {
              pattern: /^https:\/\/s3\.resci\.pro/,
            }),
          }}
          error={Boolean(errors.imageUrl)}
          helperText={errors.imageUrl ? "Invalid imageUrl" : ""}
          fullWidth
          className={classes.field}
        />
        <TextField
          id="race"
          label="NPC Race"
          variant="outlined"
          disabled={loading}
          InputProps={{
            ...register("race", {}),
          }}
          error={Boolean(errors.race)}
          helperText={errors.race ? "Invalid race" : ""}
          fullWidth
          className={classes.field}
        />
        <TextField
          id="city_organization"
          label="City/Organization"
          variant="outlined"
          disabled={loading}
          InputProps={{
            ...register("city_organization", {}),
          }}
          error={Boolean(errors.city_organization)}
          helperText={
            errors.city_organization ? "Invalid city_organization" : ""
          }
          fullWidth
          className={classes.field}
        />
        <TextField
          id="relations"
          label="Relations"
          variant="outlined"
          disabled={loading}
          InputProps={{
            ...register("relations", {}),
          }}
          error={Boolean(errors.relations)}
          helperText={errors.relations ? "Invalid relations" : ""}
          fullWidth
          className={classes.field}
        />

        <TextField
          id="status"
          select
          label="Status"
          variant="outlined"
          disabled={loading}
          fullWidth
          className={classes.field}
          defaultValue={"unknown"}
          InputProps={{
            ...register("status", {
              value: "unknown",
            }),
          }}
        >
          {statuses.map(option => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="notes"
          label="Notes"
          disabled={loading}
          multiline
          fullWidth
          InputProps={{
            ...register("notes", {}),
          }}
          rows={4}
          className={classes.field}
        />
        <TextField
          id="details"
          label="Details"
          disabled={loading}
          multiline
          rows={6}
          fullWidth
          InputProps={{
            ...register("details", {}),
          }}
          className={classes.field}
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

export default NpcCreationPage;

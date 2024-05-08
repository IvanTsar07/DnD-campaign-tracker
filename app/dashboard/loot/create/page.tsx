"use client";

import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { ArtefactModelInput } from "@/models/artefact";
import { createArtefact } from "@/lib/firebase/firestore";
import { useRouter } from "next/navigation";
import PageLogo from "@/components/common/page-logo/page-logo";
import { Inputs } from "../types";
import ArtefactForm from "../components/artefact-form";

const CreateArtefactPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

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

      <ArtefactForm
        onSubmit={onSubmit}
        loading={loading}
        submitError={submitError}
      />
    </section>
  );
};

export default CreateArtefactPage;

"use client";

import PageLogo from "@/components/common/page-logo/page-logo";
import { useEffect, useState } from "react";
import ArtefactForm from "../components/artefact-form";
import { SubmitHandler } from "react-hook-form";
import { Inputs } from "../types";
import { ArtefactModel, ArtefactModelInput } from "@/models/artefact";
import { useRouter, useSearchParams } from "next/navigation";
import { getArtefact, updateArtefact } from "@/lib/firebase/firestore";
import Loading from "@/components/common/loading/loading";

const ArtefactEditPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [artefact, setArtefact] = useState<ArtefactModel>();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      loadArtefact(id!);
    }
  }, [searchParams]);

  const loadArtefact = async (id: string) => {
    setLoading(true);
    const art = await getArtefact(id);
    setArtefact(art);
    setLoading(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { name, original_url, short_description, source, tuning, owner } =
      data;

    if (!artefact) {
      return;
    }

    setLoading(true);

    const art: ArtefactModelInput = {
      name,
      original_url,
      short_description,
      source,
      tuning,
      owner,
    };

    await updateArtefact(artefact.id, art);
  };

  return (
    <section>
      <PageLogo />

      {artefact && (
        <ArtefactForm
          onSubmit={onSubmit}
          loading={loading}
          submitError={submitError}
          defaultValues={
            artefact
              ? ({
                  name: artefact.name,
                  original_url: artefact.original_url,
                  short_description: artefact.short_description,
                  source: artefact.source,
                  tuning: artefact.tuning,
                  owner: artefact.owner,
                } as Inputs)
              : undefined
          }
        />
      )}
    </section>
  );
};

export default ArtefactEditPage;

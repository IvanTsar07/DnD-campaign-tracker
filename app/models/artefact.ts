export type ArtefactModel = {
  id: string;
  name: string;
  original_url?: string;
  short_description: string;
  source: string;
  tuning: boolean;
  owner: string;
  created_at?: number;
  modified_at?: number;
  createdAt: string;
  modifiedAt: string;
};

export type ArtefactModelInput = Omit<
  ArtefactModel,
  "id" | "created_at" | "modified_at" | "createdAt" | "modifiedAt"
>;

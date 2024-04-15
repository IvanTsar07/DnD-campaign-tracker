export type NpcModel = {
  id: string;
  name: string;
  details: string;
  race: string;
  image_url: string;
  city_org: string;
  notes: string;
  relations: string;
  status: string;
  created_at?: number;
  modified_at?: number;
  createdAt: string;
  modifiedAt: string;
};

export type NpcModelInput = Omit<
  NpcModel,
  "id" | "created_at" | "modified_at" | "createdAt" | "modifiedAt"
>;

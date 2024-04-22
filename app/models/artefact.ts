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

// TODO: replace with Art whole logic
export class Art {
  constructor(
    public id: string | undefined,
    public name: string,
    public original_url: string | undefined,
    public short_description: string,
    public source: string,
    public tuning: boolean,
    public owner: string,
    public created_at: number | undefined,
    public modified_at: number | undefined,
    public createdAt: string | undefined,
    public modifiedAt: string | undefined
  ) {
    this.id = id;
    this.name = name;
    this.original_url = original_url;
    this.short_description = short_description;
    this.source = source;
    this.tuning = tuning;
    this.owner = owner;
    this.created_at = created_at;
    this.modified_at = modified_at;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  static fromJson(json: ArtefactModel): Art {
    return new Art(
      json.id,
      json.name,
      json.original_url,
      json.short_description,
      json.source,
      json.tuning,
      json.owner,
      json.created_at,
      json.modified_at,
      json.createdAt,
      json.modifiedAt
    );
  }

  static empty(): Art {
    return new Art(
      undefined,
      "",
      undefined,
      "",
      "",
      false,
      "",
      undefined,
      undefined,
      undefined,
      undefined
    );
  }
}

export type Tags = {
  name: string;
  value: string | number;
  type: "operator" | "tag" | "number" | null;
  id: number | string;
};

export type Formula = {
  id?: string;
  name: string;
  category: string;
  value: number | string;
  inputs?: string;
};

export type Block = {
  id: string | number;
  tags: Tags[] | null;
};

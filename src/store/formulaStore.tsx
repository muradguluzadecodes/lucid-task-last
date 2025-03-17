import { create } from "zustand";

import { Tags } from "../api/type.ts";

interface FormulaStore {
  tagList: Tags[] | null;
  setTagList: (tagList: Tags[] | null) => void;
}

export const useFormulaStore = create<FormulaStore>((set) => ({
  tagList: null,
  setTagList: (tagList: Tags[] | null) => set(() => ({ tagList })),
  blockList: [{ id: 1, tags: null }],
}));

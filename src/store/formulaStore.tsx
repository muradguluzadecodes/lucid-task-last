import { create } from "zustand";

interface FormulaStore {
  formulaList: any[] | null;
  setFormulaList: (tagList: any[]) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const useFormulaStore = create<FormulaStore>((set) => ({
  formulaList: null,
  setFormulaList: (list: any[]) => set({ formulaList: list }),
  inputValue: "",
  setInputValue: (value: string) => set({ inputValue: value }),
}));

import { create } from "zustand";
interface Formula {
  name: string;
  value: string | number;
  category: string;
  id: string;
  inputs?: string[];
}

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

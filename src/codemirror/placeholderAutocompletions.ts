import type { Completion } from "@codemirror/autocomplete";
import { useFormulaStore } from "../store/formulaStore";

export function getFormulaCompletions(): Completion[] {
  const list = useFormulaStore.getState().formulaList ?? [];

  return list.map((f) => ({
    label: `${f.name} | ${f.value}`,
    type: "variable",
    apply: `{${f.name}  ${f.value}}`,
  }));
}

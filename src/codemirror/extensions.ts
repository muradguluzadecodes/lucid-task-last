import { basicSetup } from "@codemirror/basic-setup";
import { placeholderPlugin } from "./placeholderPlugin";
import { placeholderTheme } from "./theme";
import { getFormulaCompletions } from "./placeholderAutocompletions";

import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { EditorView, keymap } from "@codemirror/view";
import type { Extension } from "@codemirror/state";
const autocompleteTheme: Extension = EditorView.theme({
  ".cm-tooltip-autocomplete": {
    position: "absolute",
    zIndex: 1000,
    padding: "2px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    overflow: "hidden",
  },
  ".cm-tooltip-autocomplete ul": {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  ".cm-tooltip-autocomplete li": {
    padding: "4px 8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  ".cm-tooltip-autocomplete li[aria-selected]": {
    backgroundColor: "#3434223",
    color: "white",
  },
});

export const cmExtensions: Extension[] = [
  basicSetup,

  // 1) Your placeholder-widget plugin
  placeholderPlugin,

  // 2) Turn on the autocomplete UI
  autocompletion({
    override: [
      (context) => {
        const m = context.matchBefore(/\w*/);
        if (!m) return null;
        return {
          from: m.from,
          options: getFormulaCompletions(),
        };
      },
    ],
    // activateOnTyping: true,
  }),
  // 3) Enable the default completion key bindings (Enter, Tab, arrows...)
  keymap.of(completionKeymap),

  // 4) Theme your placeholder widgets and ensure the menu appears on top
  placeholderTheme,
  autocompleteTheme,
  EditorView.lineWrapping,
];

// src/codemirror/placeholderPlugin.ts
import {
  ViewPlugin,
  Decoration,
  DecorationSet,
  EditorView,
} from "@codemirror/view";
import { Range } from "@codemirror/state";
import { ReactWidget } from "./ReactWidget";
import { Badge } from "../components/Badge";

export const placeholderPlugin = ViewPlugin.fromClass(
  class {
    // Cache maps "from-to-name" → Range<Decoration>
    private cache = new Map<string, Range<Decoration>>();
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.buildDeco(view);
    }

    update(update: {
      docChanged: boolean;
      viewportChanged: boolean;
      view: EditorView;
    }) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.buildDeco(update.view);
      }
    }

    private buildDeco(view: EditorView): DecorationSet {
      const decos: Range<Decoration>[] = [];
      const text = view.state.doc.toString();
      const re = /\{\s*([\w\s]+?)\s*\}/g;
      let m: RegExpExecArray | null;

      while ((m = re.exec(text)) !== null) {
        const from = m.index;
        const to = from + m[0].length;
        const name = m[1].split(" ").slice(0, 2).join(" ");
        const key = `${from}-${to}-${name}`;

        // If we’ve already created a widget+range for this exact span,
        // reuse it.

        let range = this.cache.get(key);
        if (!range) {
          // Create the React widget once
          const deco = Decoration.replace({
            widget: new ReactWidget(() => <Badge name={name} />),
            inclusive: false,
          });
          range = deco.range(from, to);
          this.cache.set(key, range);
        }

        decos.push(range);
      }

      return Decoration.set(decos);
    }
  },
  {
    decorations: (v) => v.decorations,
    provide: (plugin) =>
      EditorView.atomicRanges.of((view) => {
        const inst = view.plugin(plugin);
        return inst ? inst.decorations : Decoration.none;
      }),
  },
);

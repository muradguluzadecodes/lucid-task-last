import React from "react";
import ReactDOM from "react-dom/client";
import { WidgetType } from "@codemirror/view";

export class ReactWidget extends WidgetType {
  constructor(private renderFn: () => React.ReactElement) {
    super();
  }
  toDOM() {
    const container = document.createElement("span");
    ReactDOM.createRoot(container).render(this.renderFn());
    return container;
  }
  ignoreEvent() {
    return false;
  }
}

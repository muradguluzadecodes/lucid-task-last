import { useFormulaStore } from "../../store/formulaStore";
import { evaluate } from "mathjs";
import { stripFirstTwoTokens } from "../../services/helpers";
import { useMemo } from "react";

import s from "./style.module.scss";

export default function Result() {
  const value = useFormulaStore((s) => s.inputValue) || "";

  // compute both result and error in one go, memoized on `value`
  const { result, error } = useMemo(() => {
    // If the input is empty or contains only whitespace, return 0
    if (!value.trim()) {
      return { result: 0, error: "" };
    }

    const formatted = stripFirstTwoTokens(value);
    // If after stripping tokens we have an empty string or just invalid chars
    if (!formatted.trim() || /^[a-zA-Z\s]*$/.test(formatted)) {
      return { result: 0, error: "" };
    }

    try {
      // evaluate will throw if the expression is invalid
      return { result: evaluate(formatted), error: "" };
    } catch {
      return { result: null, error: "#ERROR" };
    }
  }, [value]);

  return (
    <div className={s.resultWrapper}>
      <p className={s.result} style={{ color: error ? "#f54747" : undefined }}>
        {(error || result) ?? 0}
      </p>
    </div>
  );
}

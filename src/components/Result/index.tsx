import { useFormulaStore } from "../../store/formulaStore";
import { evaluate } from "mathjs";
import { stripFirstTwoTokens } from "../../services/helpers";
import { useMemo } from "react";

import s from "./style.module.scss";

export default function Result() {
  const value = useFormulaStore((s) => s.inputValue) || "";

  // compute both result and error in one go, memoized on `value`
  const { result, error } = useMemo(() => {
    const formatted = stripFirstTwoTokens(value);
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

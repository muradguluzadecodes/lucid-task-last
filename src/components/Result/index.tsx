import s from "./style.module.scss";
import { useFormulaStore } from "../../store/formulaStore.tsx";
import { evaluate } from "mathjs";
import { useState, useEffect } from "react";

const Result = () => {
  const tags = useFormulaStore((state) => state.tagList);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!tags || tags.length === 0) {
      setValue("");
      setError("");
      return;
    }

    const formattedString = tags.map((item) => item.value.toString()).join(" ");
    console.log(formattedString, "Formatted string");

    try {
      // Prevent evaluation of incomplete expressions
      if (/[+\-*/]$/.test(formattedString)) {
        throw new Error("Invalid expression");
      }

      const result = evaluate(formattedString);
      setValue(result);
      setError("");
    } catch (err) {
      setError("#ERROR");
      setValue("");
    }
  }, [tags]);

  return (
    <div className={s.resultWrapper}>
      <p className={s.result} style={{ color: `${error ? "#f54747" : ""}` }}>
        {error || value || "0"}
      </p>
    </div>
  );
};

export default Result;

import { useEffect, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";

import { Container } from "../Container";

import { cmExtensions } from "../../codemirror/extensions.ts";

import s from "./style.module.scss";
import { useQuery } from "@tanstack/react-query";
import getFormulaList from "../../api/getFormulaList.tsx";
import { useFormulaStore } from "../../store/formulaStore.tsx";
import Result from "../Result";

export default function AppLayout() {
  const {
    data: formulas,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["formulas"],
    queryFn: getFormulaList,
  });

  const setFormulaList = useFormulaStore((state) => state.setFormulaList);
  const inputValue = useFormulaStore((state) => state.inputValue);
  const setInputValue = useFormulaStore((state) => state.setInputValue);

  useEffect(() => {
    if (formulas && isSuccess) {
      setFormulaList(formulas);
    }
  }, [formulas, isSuccess, setFormulaList]);

  const extensions = useMemo(() => cmExtensions, []);

  if (isLoading) return <p>Loading formulas…</p>;
  if (error) return <p>Failed to load formulas</p>;

  return (
    <Container className={s.container}>
      <div className={s.appLayout}>
        <div className={s.header}>
          <div className={s.heading}>Formula</div>
        </div>

        <Result />
        <div className={s.blocksWrapper}>
          <CodeMirror
            value={inputValue}
            placeholder=""
            height="200px"
            extensions={extensions}
            onChange={(v) => {
              setInputValue(v);
            }}
          />
        </div>
      </div>
    </Container>
  );
}

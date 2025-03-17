import Result from "../../components/Result";
import FormulaInput from "../FormulaInput";

import s from "./style.module.scss";

const FormulaBlock = () => {
  return (
    <div className={s.formulaBlock}>
      <div className={s.heading}>demo-section</div>
      <Result />
      <FormulaInput />
    </div>
  );
};

export default FormulaBlock;

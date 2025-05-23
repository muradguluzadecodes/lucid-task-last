import Result from "../../components/Result";

import s from "./style.module.scss";

const FormulaBlock = () => {
  return (
    <div className={s.formulaBlock}>
      <div className={s.heading}>demo-section</div>
      <Result />
    </div>
  );
};

export default FormulaBlock;

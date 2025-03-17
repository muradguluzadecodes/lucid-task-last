import s from "./style.module.scss";
import { Formula } from "../../assets/icons/Formula.tsx";
import { Container } from "../Container";
import FormulaBlock from "../../widgets/FormulaBlock";

const AppLayout = () => {
  return (
    <Container className={s.container}>
      <div className={s.appLayout}>
        <div className={s.header}>
          <div className={s.heading}>
            <Formula /> <p>Formulas</p>
          </div>
          <button className={s.addNewBtn}>
            <p>+</p>
          </button>
        </div>
        <div className={s.blocksWrapper}>
          <FormulaBlock />
        </div>
      </div>
    </Container>
  );
};

export default AppLayout;

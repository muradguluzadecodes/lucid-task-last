import s from "./style.module.scss";
import Tag from "../../components/Tag";
import React, { useState } from "react";
import { useFormulaStore } from "../../store/formulaStore.tsx";
import { Formula, Tags } from "../../api/type.ts";
import { useQuery } from "@tanstack/react-query";
import getFormulaList from "../../api/getFormulaList.tsx";
import { checkOperators } from "../../services/helpers.ts";

const FormulaInput = () => {
  const tags = useFormulaStore((state) => state.tagList);
  const setTags = useFormulaStore((state) => state.setTagList);
  const [inputValue, setInputValue] = useState<null | string>("");

  const { data: formulaList } = useQuery<Formula[]>({
    queryKey: ["formulas"],
    queryFn: getFormulaList,
  });

  console.log(tags);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedValue = inputValue?.trim();
    const isNumber = Number(trimmedValue);

    if (trimmedValue) {
      const isMathOperator = checkOperators(trimmedValue);

      const type =
        (isNumber && "number") || (isMathOperator && "operator") || null;

      if (isMathOperator && event.key === " ") {
        if (type) {
          const newOperator = {
            id: crypto.randomUUID(),
            name: trimmedValue,
            value: trimmedValue,
            type: type as "operator" | "number" | null,
          };

          if (tags && tags.length > 0) {
            setTags([...tags, newOperator]);
          } else {
            setTags([newOperator]);
          }
          setInputValue("");
        }
      }

      if (event.key === "Enter" && trimmedValue && isNumber) {
        event.preventDefault();

        if (type) {
          const newOperator = {
            id: crypto.randomUUID(),
            name: trimmedValue,
            value: trimmedValue,
            type: type as "operator" | "number" | null,
          };

          if (tags && tags.length > 0) {
            setTags([...tags, newOperator]);
          } else {
            setTags([newOperator]);
          }
          setInputValue("");
        }
      }
    }
  };

  const handleAddTag = (selectedItem: Tags) => {
    if (inputValue && inputValue.length > 0) {
      if (tags) {
        const newTags = [...tags, selectedItem];
        setTags(newTags);
      }
      if (!tags) setTags([selectedItem]);

      setInputValue("");
    }
  };

  const matchedList = formulaList?.filter((item) =>
    item.name.startsWith(inputValue as string),
  );

  console.log("Re-rendered");

  return (
    <div className={s.wrapper}>
      <div className={s.formulaInput}>
        {tags?.map((item) => (
          <Tag
            key={item.id}
            id={item.id}
            value={item.value}
            name={item.name}
            type={item.type}
          />
        ))}
        <div className={s.inputWrapper}>
          <input
            value={inputValue as string}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            type="text"
            placeholder="Write here..."
          />
          {!!inputValue && matchedList && matchedList.length > 0 && (
            <div className={s.dropdown}>
              {matchedList?.map((suggest: Formula) => (
                <button
                  onClick={() =>
                    handleAddTag({
                      id: suggest.id as string,
                      value: suggest.value,
                      name: suggest.name,
                      type: "tag",
                    })
                  }
                  className={s.dropdownItem}
                >
                  <div>
                    <p>{suggest.name}</p>
                    <p>{suggest.category}</p>
                  </div>
                  <p className={s.value}>{suggest.value}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaInput;

import s from "./style.module.scss";
import { Close as CloseIcon } from "../../assets/icons/Close.tsx";
import { useFormulaStore } from "../../store/formulaStore.tsx";
import React, { useState } from "react";
import { checkOperators } from "../../services/helpers.ts";
import clsx from "clsx";
import { Tags } from "../../api/type.ts";

const Tag = ({ name, value, id, type }: Tags) => {
  const setTags = useFormulaStore((state) => state.setTagList);
  const tags = useFormulaStore((state) => state.tagList);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<string | number>(value || "0");
  const [error, setError] = useState(false);

  const width = value.toString().length * 16;
  const isMathOperator = checkOperators(tagValue.toString());
  const isNumber = Number(tagValue);

  const handleDelete = (id: string | number) => {
    const newItem = tags?.filter((tag) => tag.id !== id) || null;
    if (newItem && newItem.length === 1) {
      setTags([newItem[0]]);
    } else {
      setTags(newItem);
    }
  };

  const handleUpdateOperator = (id: string) => {
    if (!tags && isMathOperator) return;

    if (!isMathOperator || !isNumber) setError(true);
    if (
      (isMathOperator && type === "operator") ||
      (isNumber && type === "number")
    ) {
      const updatedTags = tags?.map((tag) =>
        tag.id === id ? { ...tag, value: tagValue } : tag,
      );

      if (updatedTags) setTags(updatedTags);
      setShowInput(false);
      setError(false);
    }
    if ((type === "operator" || type === "number") && tagValue === "") {
      handleDelete(id);
    }
  };

  const handleUpdateValue = (id: number | string) => {
    if (!tags) return;

    const updatedTags = tags.map((tag) =>
      tag.id === id ? { ...tag, value: tagValue } : tag,
    );

    setTags(updatedTags);
    setShowInput(false);
  };

  if (type === "operator") {
    return (
      <>
        {!showInput ? (
          <button onClick={() => setShowInput(true)} className={s.operator}>
            {value}
          </button>
        ) : (
          <input
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleUpdateOperator(id.toString());
              }
            }}
            onBlur={() => handleUpdateOperator(id.toString())}
            onChange={(event) => {
              setTagValue(event.target.value);
            }}
            value={tagValue}
            className={clsx(s.tagInput, error && s.errorInput)}
            style={{ "--width": `${width}px` } as React.CSSProperties}
          />
        )}
      </>
    );
  }

  if (type === "tag" || type === "number") {
    return (
      <div className={s.tag}>
        <div className={s.nameAndValue}>
          {type === "tag" && `${name} |`}
          {!showInput ? (
            <button className={s.value} onClick={() => setShowInput(true)}>
              [{tagValue}]
            </button>
          ) : (
            <input
              className={s.tagInput}
              type="text"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleUpdateValue(id);
                }
              }}
              onBlur={() => handleUpdateValue(id)}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d*$/.test(value)) {
                  setTagValue(value);
                }
              }}
              value={tagValue}
              style={{ "--width": `${width}px` } as React.CSSProperties}
            />
          )}
        </div>
        <button
          className={s.close}
          onClick={() => handleDelete(id)}
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
    );
  }
};

export default Tag;

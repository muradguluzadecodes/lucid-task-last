import React, { useState, useRef, useEffect } from "react";
import s from "./style.module.scss";
import { Arrow } from "../../assets/icons/Arrow";
import clsx from "clsx";

export interface BadgeProps {
  name: string;
}

const options = ["This month", "Previous month", "Last 3 months", "1 year ago"];

function _Badge({ name }: BadgeProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentOption, setCurrentOption] = useState(options[0]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const badgeRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (badgeRef.current && !badgeRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (value: string) => {
    setCurrentOption(value);
    setOpen(false);
  };

  return (
    <div className={s.badge} ref={badgeRef}>
      <div className={s.content}>
        <span className={s.name}>{name}</span>
        <span className={s.separator}>|</span>
        <button
          className={clsx(s.value, open && s.openStyle)}
          onClick={() => setOpen((o) => !o)}
          type="button"
        >
          <span className={s.currentOption}>{currentOption}</span>
          <Arrow />
        </button>
      </div>

      {open && (
        <div className={s.dropDown}>
          {options.map((item) => (
            <button
              key={item}
              className={s.option}
              onClick={() => handleClick(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const Badge = React.memo(_Badge);

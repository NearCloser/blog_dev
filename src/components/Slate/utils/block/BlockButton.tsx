import style from "@/styles/toggleButton.module.scss";
import { MouseEvent } from "react";
import { useSlate, useSlateStatic } from "slate-react";
import { toggleBlock } from "./toggleBlock";
import { isBlockActive } from "./isBlockActive";
import { CustomEditorInterface } from "@/@types";

export const BlockButton: CustomEditorInterface["BlockButton"] = ({
  format,
  text,
}) => {
  const editor = useSlateStatic();
  const isActive = isBlockActive(editor, format);

  return (
    <button
      className={style.toggleButton_wrapper}
      style={{ backgroundColor: isActive ? "#CED6DC" : "#E8EDF0" }}
      onMouseDown={(e: MouseEvent) => {
        e.preventDefault();
        toggleBlock(editor, { format, isActive });
      }}
    >
      {text}
    </button>
  );
};

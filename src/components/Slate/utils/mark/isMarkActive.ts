import { BaseSelection, Editor, Transforms } from "slate";
import { FormattedTextMarkType } from "@/@types";

export const isMarkActive = (editor: Editor, type: FormattedTextMarkType) => {
  const marks = Editor.marks(editor);

  return marks ? marks[type] === true : false;
};

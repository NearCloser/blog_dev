import { Editor } from "slate";
import { CustomEditorInterface } from "@/@types";

export const toggleMark: CustomEditorInterface["toggleMark"] = (
  editor,
  { format, isActive }
) => {
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

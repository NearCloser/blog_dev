import { LinkElement, CustomElement, HeadingElement } from "@/@types";
import { Transforms } from "slate";
import { CustomEditorInterface } from "@/@types";

/**
 *   toggle block mode by isActive
 */
export const toggleBlock: CustomEditorInterface["toggleBlock"] = (
  editor,
  { format, isActive, level, href }
) => {
  switch (format) {
    case "heading":
      const headingBlock: Partial<HeadingElement> = {
        type: "heading",
        level,
      };
      Transforms.setNodes(editor, headingBlock);
      break;
    default:
      const defaultProps: Partial<CustomElement> = {
        type: isActive ? "paragraph" : format,
      };
      Transforms.setNodes(editor, defaultProps);
  }
};

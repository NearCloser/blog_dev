import {
  LinkElement,
  CustomElement,
  HeadingElement,
  Imagelement,
} from "@/@types";
import { Transforms } from "slate";
import { CustomEditorInterface } from "@/@types";

/**
 *   toggle block mode by isActive
 */
export const insertImage: CustomEditorInterface["insertImage"] = (
  editor,
  { format, isActive, src, alt }
) => {
  switch (format) {
    case "image":
      const ImageBlock: Imagelement = {
        type: "image",
        src,
        alt: alt ? alt : "",
      };
      Transforms.insertNodes(editor, ImageBlock);
      break;
    default:
  }
};

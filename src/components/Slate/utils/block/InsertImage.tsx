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
  { format, src, alt }
) => {
  switch (format) {
    case "image":
      const ImageBlock: Imagelement = {
        type: "image",
        src,
        alt: alt ? alt : "",
        children: [{ text: "" }],
      };
      Transforms.insertNodes(editor, ImageBlock, { voids: true });
      break;
    default:
  }
};

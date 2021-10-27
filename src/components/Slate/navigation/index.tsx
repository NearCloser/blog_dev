import { MarkButton } from "../utils";
import { HeadingsSelect } from "../headings";
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
} from "../getTypes";

import { FormatBold } from "@styled-icons/material/FormatBold";
import { FormatItalic } from "@styled-icons/material/FormatItalic";
import { FormatUnderlined } from "@styled-icons/material/FormatUnderlined";
import style from "@/styles/create.module.scss";
import { UserCustomHeadings } from "@/@types";

const SlateNavigation = () => {
  const elements: UserCustomHeadings = [
    { display: "Heading1", level: ELEMENT_H1, fontSize: 2 },
    { display: "Heading2", level: ELEMENT_H2, fontSize: 1.8 },
    { display: "Heading3", level: ELEMENT_H3, fontSize: 1.6 },
    { display: "Heading4", level: ELEMENT_H4, fontSize: 1.6 },
    { display: "Heading5", level: ELEMENT_H5, fontSize: 1.6 },
    { display: "Heading6", level: ELEMENT_H6, fontSize: 1.6 },
    { display: "Normal", level: ELEMENT_PARAGRAPH, fontSize: 1.5 },
  ];

  return (
    <div className={style.slate_navigation_wrapper}>
      <nav className={style.slate_navigation}>
        <HeadingsSelect elements={elements} />
        <MarkButton
          format={MARK_BOLD}
          icon={<FormatBold />}
          tooltip={{ content: "Bold (⌘B)" }}
        />
        <MarkButton
          format={MARK_ITALIC}
          icon={<FormatItalic />}
          tooltip={{ content: "Italic (⌘I)" }}
        />
        <MarkButton
          format={MARK_UNDERLINE}
          icon={<FormatUnderlined />}
          tooltip={{ content: "Underline (⌘U)" }}
        />
      </nav>
    </div>
  );
};

export default SlateNavigation;

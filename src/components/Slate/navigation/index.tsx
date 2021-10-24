import { MarkButton } from "../utils";
import { MARK_BOLD, MARK_ITALIC, MARK_UNDERLINE } from "../getTypes";

import { FormatBold } from "@styled-icons/material/FormatBold";
import { FormatItalic } from "@styled-icons/material/FormatItalic";
import { FormatUnderlined } from "@styled-icons/material/FormatUnderlined";
import style from "@/styles/create.module.scss";

const SlateNavigation = () => {
  return (
    <div className={style.slate_navigation_wrapper}>
      <nav className={style.slate_navigation}>
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

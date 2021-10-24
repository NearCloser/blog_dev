import {
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";
import { Transforms } from "slate";
import { useEffect } from "react";

export const RenderElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  switch (element.type) {
    case "link":
      return (
        <a
          // contentEditable={false}
          {...attributes}
          href={element.href}
          rel="noopener noreferrer"
          target="_blank"
          className="element-link"
        >
          {children}
        </a>
      );
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "heading":
      switch (element.level) {
        case "p":
          return <p {...attributes}>{children}</p>;
        case "h1":
          return <h1 {...attributes}>{children}</h1>;
        case "h2":
          return <h2 {...attributes}>{children}</h2>;
        case "h3":
          return <h3 {...attributes}>{children}</h3>;
        case "h4":
          return <h4 {...attributes}>{children}</h4>;
        case "h5":
          return <h5 {...attributes}>{children}</h5>;
        case "h6":
          return <h6 {...attributes}>{children}</h6>;
      }
    case "ordered-list":
      return <ol {...attributes}>{children}</ol>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

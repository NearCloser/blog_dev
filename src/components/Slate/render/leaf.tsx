import { RenderLeafProps } from 'slate-react';
import { CodeBlock } from '../Code';
import Highlight, { Prism, Language } from 'prism-react-renderer';

export const RenderLeaf = ({ attributes, children, leaf, text }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

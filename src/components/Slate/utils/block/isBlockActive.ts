import { Editor, Element as SlateElement, Node } from 'slate';
import { FormatType } from '@/@types';

export const isBlockActive = (editor: Editor, format: FormatType) => {
  const [match] = Editor.nodes(editor, {
    match: (node: Node) =>
      !Editor.isEditor(node) && SlateElement.isElement(node) && node.type === format,
  });

  return !!match;
};

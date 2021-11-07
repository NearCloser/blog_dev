import { Editor } from 'slate';
import { FormattedTextMarkType } from '@/@types';

export const isMarkActive = (editor: Editor, format: FormattedTextMarkType) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

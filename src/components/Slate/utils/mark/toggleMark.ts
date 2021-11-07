import { Editor } from 'slate';
import { CustomEditorInterface } from '@/@types';
import { isMarkActive } from './isMarkActive';

export const toggleMark: CustomEditorInterface['toggleMark'] = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

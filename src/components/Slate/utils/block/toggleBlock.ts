import {
  LinkElement,
  CustomElement,
  HeadingElement,
  CodeElement,
  ParagraphElement,
} from '@/@types';
import { Transforms } from 'slate';
import { CustomEditorInterface } from '@/@types';
import { isBlockActive } from './isBlockActive';

/**
 *   toggle block mode by isActive
 */
export const toggleBlock: CustomEditorInterface['toggleBlock'] = (
  editor,
  { format, level, href },
) => {
  const isActive = isBlockActive(editor, format);

  switch (format) {
    case 'heading':
      const headingBlock: Partial<HeadingElement> = {
        type: 'heading',
        level,
      };
      Transforms.setNodes(editor, headingBlock);
      break;
    case 'code':
      const CodeProps: Partial<CustomElement> = {
        type: isActive ? 'paragraph' : format,
      };
      console.log('insert block');
      Transforms.setNodes(editor, CodeProps, { voids: true, mode: 'all' });
      break;
    default:
      const defaultProps: Partial<CustomElement> = {
        type: isActive ? 'paragraph' : format,
      };
      Transforms.setNodes(editor, defaultProps);
  }
};

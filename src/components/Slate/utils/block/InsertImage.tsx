import { LinkElement, CustomElement, HeadingElement, ImageElement } from '@/@types';
import { Transforms } from 'slate';
import { CustomEditorInterface } from '@/@types';

/**
 *   toggle block mode by isActive
 */
export const insertImage: CustomEditorInterface['insertImage'] = (editor, { format, src, alt }) => {
  switch (format) {
    case 'image':
      const ImageBlock: ImageElement = {
        type: 'image',
        src,
        alt: alt ? alt : '',
        children: [{ text: '' }],
      };
      Transforms.insertNodes(editor, ImageBlock, { voids: true });
      break;
    default:
  }
};

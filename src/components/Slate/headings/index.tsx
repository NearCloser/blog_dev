import { useRef, useState } from 'react';
import style from '@/styles/create.module.scss';
import { useOnClickOutside } from '@/hooks/useOutsideClick';
import { useSlate } from 'slate-react';
import { CustomEditor, HeadingElement, UserCustomHeadings } from '@/@types';
import { Editor, Element as SlateElement, Node } from 'slate';
import { toggleBlock } from '../utils';

export const isHeadingBlockActive = (editor: CustomEditor, level: HeadingElement['level']) => {
  const [match] = Editor.nodes(editor, {
    match: (node: Node) =>
      !Editor.isEditor(node) &&
      SlateElement.isElement(node) &&
      node.type === 'heading' &&
      node.level === level,
  });

  return !!match;
};

/**
 * Headings Selection to select or toggle the type of Heading elements in selection.
 */
export const HeadingsSelect = ({ elements }: { elements: UserCustomHeadings }) => {
  const [isHeadingsSelection, setIsHeadingsSelection] = useState(false);
  const headingsRef = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();

  useOnClickOutside(headingsRef, () => setIsHeadingsSelection(false));

  const ActiveHeading = elements.filter(({ level }) => isHeadingBlockActive(editor, level))[0];

  return (
    <div className={style.select_blocks_main_wrapper} ref={headingsRef}>
      <div
        onClick={() => setIsHeadingsSelection(!isHeadingsSelection)}
        className={style.main_headings}
      >
        {ActiveHeading?.display || 'Normal'}
      </div>
      {isHeadingsSelection && (
        <div className={style.headings_wrapper}>
          {elements.map(({ display, level, fontSize }) => {
            const isActive = isHeadingBlockActive(editor, level);

            return (
              <div
                key={display}
                className={style.heading_item}
                style={{
                  color: isActive ? '#4587E6' : '#1B2E4A',
                  fontSize: `${fontSize}rem`,
                }}
                onMouseDown={() => {
                  toggleBlock(editor, { format: 'heading', level, isActive });
                  setIsHeadingsSelection(false);
                }}
              >
                {display}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

import { ReactEditor, RenderElementProps, useSelected, useSlate } from 'slate-react';
import { Transforms } from 'slate';
import Image from 'next/image';
import style from '@/styles/create.module.scss';
import { Delete } from '@styled-icons/feather/Delete';
import { ImageDeleteTool } from '../imageUpload';
import LinkDetailPortal from '../InsertLink/LinkDetailPortal';
import { useStore } from '@/store';
import Tippy, { TippyProps } from '@tippyjs/react';
import React from 'react';
import { CodeBlock } from '../Code';

export const RenderElement = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlate();
  const toggleLinkDetailPortal = useStore((state) => state.toggleLinkDetailPortal);
  const setLinkElement = useStore((state) => state.setLinkElement);

  switch (element.type) {
    case 'code':
      return (
        <div
          {...attributes}
          style={{
            color: 'lightblue',
          }}
        >
          {/* <CodeBlock
            codeString={element.children[0].text}
            language={'javascript'}
            title={`exmaple.js`}
          /> */}
          {children}
        </div>
      );
    case 'image':
      return (
        <div {...attributes}>
          <figure className={style.figure_container}>
            <Image
              src={element.src}
              alt={element.alt}
              layout={'fixed'}
              width={420}
              height={280}
              objectFit={`cover`}
            />
            <div className={style.figure_delete_button_wrapper}>
              <ImageDeleteTool icon={<Delete />} {...{ element }} />
            </div>
          </figure>
          {children}
        </div>
      );
    case 'link':
      const tooltipProps: TippyProps = {
        content: element.href,
        arrow: false,
        placement: 'top',
        delay: 0,
        duration: [180, 0],
        offset: [0, 8],
      };

      return (
        <>
          <Tippy {...tooltipProps}>
            <span
              onMouseDown={(e) => {
                e.preventDefault();
                editor && Transforms.deselect(editor);
              }}
              onMouseUp={() => {
                if (editor && !editor.selection) {
                  const path = ReactEditor.findPath(editor, element);
                  toggleLinkDetailPortal();
                  setLinkElement(path, element);
                }
              }}
            >
              <a
                {...attributes}
                href={element.href}
                rel='noopener noreferrer'
                target='_blank'
                className='element-link'
              >
                {children}
              </a>
            </span>
          </Tippy>
          <LinkDetailPortal />
        </>
      );
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'heading':
      switch (element.level) {
        case 'p':
          return <p {...attributes}>{children}</p>;
        case 'h1':
          return <h1 {...attributes}>{children}</h1>;
        case 'h2':
          return <h2 {...attributes}>{children}</h2>;
        case 'h3':
          return <h3 {...attributes}>{children}</h3>;
        case 'h4':
          return <h4 {...attributes}>{children}</h4>;
        case 'h5':
          return <h5 {...attributes}>{children}</h5>;
        case 'h6':
          return <h6 {...attributes}>{children}</h6>;
      }
    case 'ordered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

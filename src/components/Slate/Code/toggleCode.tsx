import { useRef, useState } from 'react';
import style from '@/styles/create.module.scss';
import { useOnClickOutside } from '@/hooks/useOutsideClick';
import { useSlate } from 'slate-react';
import { CustomEditor, HeadingElement, UserCustomHeadings } from '@/@types';
import { Editor, Element as SlateElement, Node } from 'slate';
import { BlockButton } from '../utils';
import { CodeSlash as StyledCodeSlash } from '@styled-icons/bootstrap/CodeSlash';

import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface ToolMarkButtonProps {
  format: '';
  icon: any;
  tooltip: TippyProps;
}

export const CodeBlockToggle = () => {
  const tooltipProps: TippyProps = {
    arrow: true,
    offset: [0, 17],
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    content: 'コード',
  };

  return (
    <Tippy {...tooltipProps}>
      <BlockButton format='code' icon={<StyledCodeSlash />} />
    </Tippy>
  );
};

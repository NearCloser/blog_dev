import style from '@/styles/toggleButton.module.scss';
import { MouseEvent } from 'react';
import { useSlate, useSlateStatic } from 'slate-react';
import { toggleBlock } from './toggleBlock';
import { isBlockActive } from './isBlockActive';
import { CustomEditorInterface, FormatType } from '@/@types';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface BlockButtonProps {
  format: FormatType;
  icon: any;
  tooltip: TippyProps;
}

export const BlockButton: CustomEditorInterface['BlockButton'] = ({
  format,
  icon,
  tooltip,
}: BlockButtonProps) => {
  const editor = useSlateStatic();
  const isActive = isBlockActive(editor, format);

  const tooltipProps: TippyProps = {
    arrow: true,
    offset: [0, 17],
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    ...tooltip,
  };

  return (
    <Tippy {...tooltipProps}>
      <div
        style={{
          color: isActive ? '#4587E6' : '#4a5669',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          margin: '.3rem .4rem',
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          toggleBlock(editor, { format, isActive });
        }}
      >
        {icon}
      </div>
    </Tippy>
  );
};

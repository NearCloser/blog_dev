import React, { MouseEvent } from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive } from './isMarkActive';
import { toggleMark } from './toggleMark';
import { CustomEditorInterface, FormattedTextMarkType } from '@/@types';
import { Editor, Selection } from 'slate';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface ToolMarkButtonProps {
  format: FormattedTextMarkType;
  icon: any;
  tooltip: TippyProps;
}

export const MarkButton: CustomEditorInterface['MarkButton'] = ({
  format,
  icon,
  tooltip,
}: ToolMarkButtonProps) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

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
        data-float='ToolbarButton'
        onMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          toggleMark(editor, { format, isActive });
        }}
      >
        {icon}
      </div>
    </Tippy>
  );
};

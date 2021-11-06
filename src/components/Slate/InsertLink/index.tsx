import LinkPortal from './LinkPortal';
import style from '@/styles/create.module.scss';
import Tippy, { TippyProps } from '@tippyjs/react';
import { useStore } from '@/store';
import { RenderElementProps } from 'slate-react';

interface ImageUploadToolProps {
  icon: any;
}
export const InsertLinkTool = ({ icon }: ImageUploadToolProps) => {
  const toggleLinkPortal = useStore((state) => state.toggleLinkPortal);

  const tooltipProps: TippyProps = {
    content: 'リンクを挿入する',
    arrow: true,
    offset: [0, 17],
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
  };

  return (
    <>
      <Tippy {...tooltipProps}>
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            toggleLinkPortal();
          }}
          className={style.portal__button}
        >
          {icon}
        </div>
      </Tippy>
      <LinkPortal />
    </>
  );
};

interface ImageDeleteToolProps {
  icon: any;
  element: RenderElementProps['element'];
}

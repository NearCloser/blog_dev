import ImagePortal from "./imagePortal";
import style from "@/styles/create.module.scss";

import Tippy, { TippyProps } from "@tippyjs/react";
import { useStore } from "@/store";

interface ToolMarkButtonProps {
  icon: any;
}
export const ImageUploadTool = ({ icon }: ToolMarkButtonProps) => {
  const toggleImagePortal = useStore((state) => state.toggleImagePortal);

  const tooltipProps: TippyProps = {
    content: "画像",
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
            toggleImagePortal();
          }}
          className={style.link_portal_button}
        >
          {icon}
        </div>
      </Tippy>
      <ImagePortal />
    </>
  );
};

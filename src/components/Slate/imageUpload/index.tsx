import ImagePortal from "./imagePortal";
import { DeletePortal } from "./deletePortal";
import style from "@/styles/create.module.scss";
import Tippy, { TippyProps } from "@tippyjs/react";
import { useStore } from "@/store";
import { RenderElementProps } from "slate-react";

interface ImageUploadToolProps {
  icon: any;
}
export const ImageUploadTool = ({ icon }: ImageUploadToolProps) => {
  const toggleImagePortal = useStore((state) => state.toggleImagePortal);

  const tooltipProps: TippyProps = {
    content: "画像をアップロードする",
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

interface ImageDeleteToolProps {
  icon: any;
  element: RenderElementProps["element"];
}

export const ImageDeleteTool = ({ icon, element }: ImageDeleteToolProps) => {
  const toggleDeleteImagePortal = useStore(
    (state) => state.toggleDeleteImagePortal
  );

  const tooltipProps: TippyProps = {
    content: "画像を削除する",
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
            toggleDeleteImagePortal();
          }}
          className={style.figure_delete_button}
        >
          {icon}
        </div>
      </Tippy>
      <DeletePortal {...{ element }} />
    </>
  );
};

import React from "react";
import { Portal } from "@/components/Portal";
import style from "@/styles/create.module.scss";
import { useEffect, useRef, useState } from "react";
import { useSlateStatic, RenderElementProps } from "slate-react";
import { ReactEditor } from "slate-react";
import { useStore } from "@/store";
import { Transforms } from "slate";

interface DeletePortalProps {
  element: RenderElementProps["element"];
}

export const DeletePortal = ({ element }: DeletePortalProps) => {
  const isOpenDeleteImagePortal = useStore(
    (state) => state.isOpenDeleteImagePortal
  );
  const toggleDeleteImagePortal = useStore(
    (state) => state.toggleDeleteImagePortal
  );

  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  return (
    <Portal>
      <div
        style={{
          visibility: isOpenDeleteImagePortal ? "visible" : "hidden",
          opacity: isOpenDeleteImagePortal ? 1 : 0,
        }}
        className={style.portal_overlay}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleDeleteImagePortal();
        }}
      >
        <div className={style.portal_container}>
          <div
            className={style.portal_deleteImage_content}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={style.portal_title_container}>
              <h2 className={style.portal_title}>画像を削除する</h2>
            </div>

            <p className={style.caution_text}>この画像を削除しますか？</p>
            <div className={style.insert_button_wrapper}>
              <button
                className={style.insert_image_button}
                onClick={() => {
                  Transforms.removeNodes(editor, { at: path });
                }}
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

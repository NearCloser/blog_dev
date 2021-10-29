import { Portal } from "@/components/Portal";
import style from "@/styles/create.module.scss";
// import { insertImage } from "@udecode/plate-image";
import { ChangeEvent, forwardRef, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import Button from "@/components/Button";
import { useStore } from "@/store";
import axios from "axios";
import { DragEvent } from "react";
import { useSlate } from "slate-react";

const ImagePortal = () => {
  const isOpenImagePortal = useStore((state) => state.isOpenImagePortal);
  const toggleImagePortal = useStore((state) => state.toggleImagePortal);

  const editor = useSlate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setimgPreview] = useState<string | null>(null);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files;
      console.log(file);
      // uploadImage(file);
      // const image_url = URL.createObjectURL(file);
      // setimgPreview(image_url);
    }
  };
  const clickHiddenInput = () => {
    if (inputRef !== null) {
      inputRef?.current?.click();
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    let files = [...e.dataTransfer.files];
    let files_with_preview = [];
    console.log(files);
    // files.map((file, index) => {
    //   file[`image_${index}`] = URL.createObjectURL(file);
    //   files_with_preview.push(file);
    // });
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <Portal>
      <div
        style={{
          visibility: isOpenImagePortal ? "visible" : "hidden",
          opacity: isOpenImagePortal ? 1 : 0,
        }}
        className={style.link_portal_overlay}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleImagePortal();
        }}
      >
        <div className={style.link_portal_container}>
          <div
            className={style.link_content}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={style.portal_title_container}>
              <h2 className={style.portal_title}>画像をアップロードする</h2>
            </div>
            <div
              className={style.portal_drop_field_wrapper}
              onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e)}
              onDragOver={(e: DragEvent<HTMLDivElement>) => handleDragOver(e)}
            >
              <div className={style.portal_drop_field}>
                <div
                  className={style.select_file}
                  onClick={() => clickHiddenInput()}
                >
                  ファイルを選択する
                </div>
              </div>
            </div>
            <input
              hidden
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onFileInputChange}
            />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ImagePortal;

import { Portal } from "@/components/Portal";
import style from "@/styles/create.module.scss";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store";
import axios from "axios";
import { DragEvent } from "react";
import { useSlate } from "slate-react";
import { insertImage } from "../utils/block/InsertImage";
import { useRouter } from "next/router";
import Image from "next/image";

const ImagePortal = () => {
  const isOpenImagePortal = useStore((state) => state.isOpenImagePortal);
  const toggleImagePortal = useStore((state) => state.toggleImagePortal);

  const router = useRouter();
  const { id } = router.query;
  const editor = useSlate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [objectURL, setObjectURL] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [altText, setAltText] = useState<string>("");

  const altTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAltText(e.target.value);
  };

  const uploadImage = async () => {
    try {
      const params = new FormData();
      imageFile && params.append("file", imageFile);
      const { data } = await axios.post(`/go/uploadImage/${id}`, params, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(data);
      const { filename } = data;
      insertImage(editor, {
        format: "image",
        src: `https://delivery.far-float.jp/${id}/${filename}`,
        alt: altText,
      });
      toggleImagePortal();
    } catch (error) {
      console.log(error);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files;
      setImageFile(file[0]);
      const objectURL = URL.createObjectURL(file[0]);
      setObjectURL(objectURL);
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
    console.log(files);
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
        className={style.portal_overlay}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleImagePortal();
        }}
      >
        <div className={style.portal_container}>
          <div
            className={style.portal_uploadImage_content}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={style.portal_title_container}>
              <h2 className={style.portal_title}>画像をアップロードする</h2>
            </div>
            {objectURL ? (
              <figure className={style.objectURL_container}>
                <Image
                  src={objectURL}
                  height={`300px`}
                  width={`400px`}
                  objectFit={`contain`}
                />
              </figure>
            ) : (
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
            )}
            <input
              hidden
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onFileInputChange}
            />

            <div className={style.alt_input_wrapper}>
              <label htmlFor="image_alt" className={style.alt_input_label}>
                Alt
              </label>
              <input
                className={style.alt_input}
                id="image_alt"
                type="text"
                onChange={altTextChange}
                value={altText}
              />
            </div>

            <div className={style.insert_button_wrapper}>
              <button
                className={style.insert_image_button}
                onClick={() => imageFile && uploadImage()}
              >
                アップロード
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ImagePortal;

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RichTextEditor } from "@/components";
import axios from "axios";
import style from "@/styles/create.module.scss";
import { InputHTMLAttributes, useRef, useState } from "react";
import { Calendar } from "@/components";
import { useStore } from "@/store";

const Home: NextPage = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const FileInputHandler = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const [value, setValue] = useState("");
  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
        setValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const title = useStore((state) => state.title);
  const setTitle = useStore((state) => state.setTitle);

  return (
    <div className={style.create_main_wrapper}>
      <div className={style.create_container}>
        <div className={style.input_container}>
          <label htmlFor="main_title" className={style.label}>
            タイトル
          </label>
          <input
            type="text"
            id="main_title"
            className={style.input_box}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={style.input_file_wrapper}>
          <label htmlFor="img_file" className={style.label}>
            サムネイル
          </label>
          <div className={style.input_file_container}>
            <input
              name="img_file"
              type="file"
              ref={fileInputRef}
              className={style.file_input}
              onChange={onChangeInputFile}
            />
            <button
              className={style.input_file_text}
              onClick={() => FileInputHandler()}
            >
              ファイルを選択する
            </button>
          </div>
          {value && <img src={value} alt="" className={style.input_file_img} />}
        </div>
        <Calendar />
        <div className={style.contents_main_wrapper}>
          <RichTextEditor />
        </div>
      </div>
    </div>
  );
};

export default Home;

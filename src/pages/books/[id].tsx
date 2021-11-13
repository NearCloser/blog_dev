import type { NextPage } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RichTextEditor } from '@/components';
import axios from 'axios';
import style from '@/styles/create.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, Title } from '@/components';
import { useStore } from '@/store';
import { MainLayout } from '@/layout';
import { useRouter } from 'next/router';
import ReactLoading from 'react-loading';
import Image from 'next/image';
import useSWR from 'swr';

interface CategoryList {
  categoryId: string;
  categoryName: string;
  createdAt: string;
  description: string;
}

const fetcher = async (url: string): Promise<CategoryList[] | null> => {
  try {
    const { data } = await axios.get<CategoryList[]>(url);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface ArticleList {
  ArticleId: string;
  title: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  contents: string;
  thumbnail: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR('http://127.0.0.1:4000/v1/category', fetcher);
  const setTitle = useStore((state) => state.setTitle);
  const setCreatedAt = useStore((state) => state.setCreatedAt);
  const setCategory = useStore((state) => state.setCategory);
  const setContents = useStore((state) => state.setContents);
  const setThumbnail = useStore((state) => state.setThumbnail);

  const RetrieveArticle = useCallback(async () => {
    try {
      const { data } = await axios.get<ArticleList>(`http://127.0.0.1:4000/v1/article/${id}`);
      const { title, createdAt, contents, categoryId, thumbnail } = data;
      const parsedContents = JSON.parse(contents);
      setTitle(title);
      setCategory(categoryId);
      setCreatedAt(createdAt);
      setContents(parsedContents);
      setThumbnail(thumbnail);
    } catch (error) {
      console.log(error);
    }
  }, [id, setContents, setCreatedAt, setTitle, setCategory]);

  useEffect(() => {
    id && RetrieveArticle();

    return () => {
      setTitle(null);
      setCreatedAt(null);
      setContents(null);
      setCategory(null);
    };
  }, [id, setTitle, setCreatedAt, setContents, setCategory, RetrieveArticle]);

  // console.log(data);
  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
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
  const [value, setValue] = useState('');
  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue('');
      uploadImage(e.target.files[0]);
    }
  };

  const uploadImage = async (imgData: Blob) => {
    const params = new FormData();
    params.append('file', imgData);
    try {
      const { data } = await axios.post(
        `http://127.0.0.1:4000/v1/article/${id}/thumbnail`,
        params,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const title = useStore((state) => state.title);
  const createdAt = useStore((state) => state.createdAt);
  const contents = useStore((state) => state.contents);
  const categoryId = useStore((state) => state.categoryId);
  const thumbnail = useStore((state) => state.thumbnail);

  const selectCat: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCategory(e.target.value);
  };
  const UpdateArticleHandler = async () => {
    try {
      const { data } = await axios.post(`http://127.0.0.1:4000/v1/article/${id}`, {
        title,
        createdAt,
        categoryId,
        contents: JSON.stringify(contents),
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className={style.create_main_wrapper} id='main_container'>
        <div className={style.tool_box_wrapper}>
          <div className={style.update_button_wrapper} onClick={() => UpdateArticleHandler()}>
            <div className={style.update_button}>更新する</div>
          </div>
        </div>
        <div className={style.create_container}>
          <div className={style.input_file_wrapper}>
            <label htmlFor='img_file' className={style.label}>
              サムネイル
            </label>
            <div className={style.input_file_container}>
              <input
                name='img_file'
                type='file'
                ref={fileInputRef}
                className={style.file_input}
                onChange={onChangeInputFile}
              />
              <button className={style.input_file_text} onClick={() => FileInputHandler()}>
                ファイルを選択する
              </button>
            </div>
            {thumbnail && (
              <Image
                src={`https://delivery.far-float.jp/${id}/${thumbnail}`}
                alt='alt'
                className={style.input_file_img}
                width={`300`}
                height={`400`}
              />
            )}
          </div>

          {/* <div className={style.created_at_wrapper}>
            <label htmlFor='createdAt' className={style.created_at_label}>
              投稿日
            </label>
            {createdAt && <Calendar {...{ createdAt, setCreatedAt }} />}
          </div> */}

          {/* <div className={style.created_at_wrapper}>
            <label htmlFor='createdAt' className={style.created_at_label}>
              カテゴリー
            </label>
            {data && (
              <select
                name='category'
                id='category'
                className={style.select_category}
                onChange={selectCat}
                value={categoryId || ''}
              >
                <option value='' className={style.category_option}>
                  カテゴリーを選択
                </option>
                {data.map(({ categoryId, categoryName }) => {
                  return (
                    <option value={categoryId} key={categoryId} className={style.category_option}>
                      {categoryName}
                    </option>
                  );
                })}
              </select>
            )}
          </div> */}

          {contents ? (
            <div className={style.contents_main_wrapper}>
              <RichTextEditor />
            </div>
          ) : (
            <div className={style.loading_wrapper}>
              <ReactLoading
                type={'cylon'}
                color={'rgb(48, 92, 150)'}
                height={'15%'}
                width={'15%'}
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

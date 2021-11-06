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

interface CategoryProps {
  categoryId: string;
  categoryName: string;
  createdAt: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const setTitle = useStore((state) => state.setTitle);
  const setCreatedAt = useStore((state) => state.setCreatedAt);
  const setContents = useStore((state) => state.setContents);

  const RetrieveCategory = useCallback(async () => {
    try {
      const { data } = await axios.get<CategoryProps>(
        `http://127.0.0.1:4000/v1/category/${categoryId}`,
      );
      const { categoryName, createdAt } = data;

      setTitle(categoryName);
      setCreatedAt(createdAt);
    } catch (error) {
      console.log(error);
    }
  }, [categoryId, setCreatedAt, setTitle]);

  useEffect(() => {
    categoryId && RetrieveCategory();

    return () => {
      setTitle(null);
      setCreatedAt(null);
      setContents(null);
    };
  }, [categoryId, setTitle, setCreatedAt, setContents, RetrieveCategory]);

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

  const title = useStore((state) => state.title);
  const createdAt = useStore((state) => state.createdAt);

  const UpdateCategoryHandler = async () => {
    try {
      const { data } = await axios.post(`http://127.0.0.1:4000/v1/category/${categoryId}`, {
        title,
        createdAt,
      });

      console.log(data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className={style.create_main_wrapper} id='main_container'>
        <div className={style.tool_box_wrapper}>
          <div className={style.update_button_wrapper} onClick={() => UpdateCategoryHandler()}>
            <div className={style.update_button}>更新する</div>
          </div>
        </div>
        <div className={style.create_container}>
          <Title {...{ label: 'カテゴリー', title, setTitle }} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

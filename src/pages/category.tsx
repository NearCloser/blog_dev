import { MainLayout } from '@/layout';
import { useStore } from '@/store';
import style from '@/styles/category.module.scss';
import { TimeFive } from '@styled-icons/boxicons-regular/TimeFive';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Descendant } from 'slate';
import useSWR from 'swr';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface CategoryList {
  docID: string;
  categoryName: string;
}

interface CategoryListProps {
  final: CategoryList[];
}

const fetcher = async (url: string): Promise<CategoryListProps | null> => {
  const response = await fetch(url);
  return response.json();
};

const Category = () => {
  const { data, error } = useSWR('http://127.0.0.1:4000/v1/category', fetcher);
  const formik = useFormik({
    initialValues: {
      categoryName: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const CreateCategory = async () => {
    try {
      const { data } = await axios.post('http://127.0.0.1:4000/create', {
        categoryName: moment().format('YYYY-MM-DD'),
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);
  useEffect(() => {
    return () => {
      alert('nibu akari');
    };
  });

  return (
    <MainLayout>
      <div className={style.category_main_wrapper}>
        <div className={style.category_container}>
          <div>
            <div className={style.create_button_wrapper}>
              <div className={style.create_button} onClick={() => {}}>
                作成する
              </div>
              <div className={style.title_input_container}>
                <label htmlFor='categoryName' className={style.label}>
                  カテゴリー
                </label>
                <div className={style.input_container}>
                  <input
                    type='text'
                    id='categoryName'
                    className={style.input_box}
                    onChange={formik.handleChange}
                    value={formik.values.categoryName}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.list_main_wrapper}>
            <div className={style.list_container}>
              {data &&
                data.final.map(({ categoryName, docID }) => {
                  return (
                    <div className={style.list_item} key={docID}>
                      <h2 className={style.list_title}>{categoryName || 'Untitled'}</h2>

                      <div className={style.created_at_container}>
                        <div className={style.created_at}>
                          <TimeFive size={14} />
                          <span>{''}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;

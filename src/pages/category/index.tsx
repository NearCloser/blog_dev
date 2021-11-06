import { MainLayout } from '@/layout';
import Link from 'next/link';
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
import { Calendar, Title } from '@/components';

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

const Category = () => {
  const router = useRouter();
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
      const { data } = await axios.post('http://127.0.0.1:4000/v1/category', {
        createdAt: moment().format('YYYY-MM-DD'),
      });

      const { categoryId } = data;
      router.push(`/category/${categoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className={style.category_main_wrapper}>
        <div className={style.category_container}>
          <div className={style.tool_box_wrapper}>
            <div className={style.create_button_wrapper}>
              <div className={style.create_button} onClick={() => CreateCategory()}>
                作成する
              </div>
            </div>
          </div>
          <div>
            {/* <div className={style.create_button_wrapper}>
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
            </div> */}
          </div>

          <div className={style.list_main_wrapper}>
            <div className={style.list_container}>
              {data &&
                data.map(({ categoryName, categoryId, createdAt }) => {
                  return (
                    <Link href={`/category/${categoryId}`} key={categoryId}>
                      <a>
                        <div className={style.list_item}>
                          <h2 className={style.list_title}>{categoryName || 'Untitled'}</h2>

                          <div className={style.created_at_container}>
                            <div className={style.created_at}>
                              <TimeFive size={14} />
                              <span>{createdAt}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
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

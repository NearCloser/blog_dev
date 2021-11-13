import { MainLayout } from '@/layout';
import Link from 'next/link';
import { useStore } from '@/store';
import style from '@/styles/home.module.scss';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Descendant } from 'slate';
import useSWR from 'swr';
import { MiniPortal } from '@/components';

interface ArticleList {
  articleId: string;
  title: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  contents: string;
}

const fetcher = async (url: string): Promise<ArticleList[] | null> => {
  try {
    const { data } = await axios.get<ArticleList[]>(url);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Home = () => {
  const router = useRouter();
  const initialContents: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }] }];
  const { data, error } = useSWR('http://127.0.0.1:4000/v1/article', fetcher);

  const CreateArticleHandler = async () => {
    try {
      const { data } = await axios.post('http://127.0.0.1:4000/v1/article', {
        createdAt: moment().format('YYYY-MM-DD'),
        contents: JSON.stringify(initialContents),
      });
      const { articleId } = data;
      router.push(`/books/${articleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className={style.home_main_wrapper}>
        <div className={style.tool_box_wrapper}>
          <div className={style.create_button_wrapper}>
            <div className={style.create_button} onClick={() => CreateArticleHandler()}>
              作成する
            </div>
          </div>
        </div>

        <div className={style.list_main_wrapper}>
          <div className={style.list_container}>
            <table className={style.article_table}>
              <tbody>
                <tr>
                  <th>タイトル</th>
                  <th>作成日</th>
                  <th>カテゴリ</th>
                </tr>
                {data &&
                  data.map(({ title, createdAt, articleId, categoryId, categoryName }) => {
                    return (
                      <tr className={style.contents_row_container} key={articleId}>
                        <td className={style.contents_title}>
                          <Link href={`/books/${articleId}`} key={articleId}>
                            <a>{title || 'Untitled'} </a>
                          </Link>
                        </td>
                        <td className={style.createdAt}>
                          <span>{createdAt}</span>
                        </td>
                        <td className={style.catName} data-catid={categoryId}>
                          {categoryName}
                        </td>

                        <td className={style.option_icon_container}>
                          <MiniPortal docID={articleId} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

const MicroPortal = () => {
  return (
    <div className={style.microPortal_container}>
      <ul className={style.microPortal_list_wrapper}>
        <li className={style.microPortal_list_delete}>削除する</li>
      </ul>
    </div>
  );
};

import { MainLayout } from '@/layout';
import Link from 'next/link';
import { useStore } from '@/store';
import style from '@/styles/home.module.scss';
import { TimeFive } from '@styled-icons/boxicons-regular/TimeFive';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Descendant } from 'slate';
import useSWR from 'swr';

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
            {data &&
              data.map(({ title, createdAt, articleId, categoryId, categoryName }) => {
                return (
                  <Link href={`/books/${articleId}`} key={articleId}>
                    <a>
                      <div className={style.list_item}>
                        <h2 className={style.list_title}>{title || 'Untitled'}</h2>
                        <div className={style.tag_container}>
                          <div className={style.tag_name}>タグの名前</div>
                          <div className={style.tag_name}>タグの名前</div>
                          <div className={style.tag_name}>タグの名前</div>
                        </div>

                        <div className={style.created_at_container}>
                          <div className={style.created_at}>
                            <TimeFive size={14} />
                            <span>{createdAt}</span>
                          </div>
                        </div>
                        <div className={style.category_container}>{categoryName}</div>
                      </div>
                    </a>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

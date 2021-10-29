import { MainLayout } from "@/layout";
import style from "@/styles/home.module.scss";
import { TimeFive } from "@styled-icons/boxicons-regular/TimeFive";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import useSWR from "swr";

interface ArticleList {
  docID: string;
  title: string;
  createdAt: string;
  contents: string;
}

interface ArticleListProps {
  final: ArticleList[];
}

const fetcher = async (url: string): Promise<ArticleListProps | null> => {
  const response = await fetch(url);
  return response.json();
};

const Home = () => {
  const router = useRouter();
  const { data, error } = useSWR("/go/retrieveAllArticle", fetcher);

  const createHandler = async () => {
    try {
      const { data } = await axios.post("/go/create", {
        created_at: moment().format("YYYY年M年D日"),
      });

      router.push(`/books/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    <MainLayout>
      <div className={style.home_main_wrapper}>
        <div className={style.tool_box_wrapper}>
          <div className={style.create_button_wrapper}>
            <div
              className={style.create_button}
              onClick={() => createHandler()}
            >
              作成する
            </div>
          </div>
        </div>

        <div className={style.list_main_wrapper}>
          <div className={style.list_container}>
            {data &&
              data.final.map(({ title, createdAt, docID }) => {
                return (
                  <div
                    className={style.list_item}
                    key={docID}
                    onClick={() => {
                      router.push(`/books/${docID}`);
                    }}
                  >
                    <h2 className={style.list_title}>{title}</h2>
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
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

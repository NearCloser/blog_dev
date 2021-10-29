import { MainLayout } from "@/layout";
import style from "@/styles/home.module.scss";
import { TimeFive } from "@styled-icons/boxicons-regular/TimeFive";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

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
            <div className={style.list_item}>
              <h2 className={style.list_title}>ここにタイトルが入る</h2>
              <div className={style.tag_container}>
                <div className={style.tag_name}>タグの名前</div>
                <div className={style.tag_name}>タグの名前</div>
                <div className={style.tag_name}>タグの名前</div>
              </div>

              <div className={style.created_at_container}>
                <div className={style.created_at}>
                  <TimeFive size={14} />
                  <span>2021年4月8日</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

import style from "@/styles/header.module.scss";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header className={style.header_main_wrapper}>
      <div className={style.header_container}>
        <nav className={style.header_container}>
          <div className={style.header_button} onClick={() => router.push("/")}>
            ブログ
          </div>
        </nav>

        {/* <div className={style.create_button_wrapper}>
          <div className={style.create_button}>作成</div>
        </div> */}
      </div>
    </header>
  );
};

export default Header;

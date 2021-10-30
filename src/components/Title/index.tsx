import { useStore } from "@/store";
import style from "@/styles/create.module.scss";

const Title = () => {
  const title = useStore((state) => state.title);
  const setTitle = useStore((state) => state.setTitle);

  const getStyle = () => {
    return title
      ? style.input_container
      : `${style.input_container} ${style.is_loading}`;
  };

  return (
    <div className={style.title_input_container}>
      <label htmlFor="main_title" className={style.label}>
        タイトル
      </label>
      <div className={getStyle()}>
        <input
          type="text"
          id="main_title"
          className={style.input_box}
          value={title ? title : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setTitle(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Title;

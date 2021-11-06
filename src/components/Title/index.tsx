import { useStore } from '@/store';
import style from '@/styles/create.module.scss';

interface TitleProps {
  label: string;
  title: null | string;
  setTitle: (title: string | null) => void;
}

const Title = ({ label, title, setTitle }: TitleProps) => {
  const getStyle = () => {
    return title !== null ? style.input_container : `${style.input_container} ${style.is_loading}`;
  };

  return (
    <div className={style.title_input_container}>
      <label htmlFor='main_title' className={style.label}>
        {label}
      </label>
      <div className={getStyle()}>
        <input
          type='text'
          id='main_title'
          className={style.input_box}
          value={title ?? ''}
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

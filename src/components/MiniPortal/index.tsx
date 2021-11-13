import style from '@/styles/home.module.scss';
import { ReactChild, ReactNode, useRef, useState } from 'react';
import { useOnClickOutside } from '@/hooks/useOutsideClick';
import axios from 'axios';
import { useSWRConfig } from 'swr';
interface MiniPortalProps {
  docID: string;
}
const MiniPortal = ({ docID }: MiniPortalProps) => {
  const [show, setShow] = useState(false);
  const { mutate } = useSWRConfig();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShow(false));

  const DeleteArticle = async () => {
    try {
      const { data } = await axios.delete(`http://127.0.0.1:4000/v1/article/${docID}`);
      console.log(data);
      mutate('http://127.0.0.1:4000/v1/article');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.microPortal_wrapper}>
      <div className={style.option_icon} onClick={() => setShow(!show)}>
        <div className={style.icon_dot}></div>
        <div className={style.icon_dot}></div>
        <div className={style.icon_dot}></div>
      </div>
      <div
        ref={ref}
        className={style.microPortal_container}
        style={{
          visibility: show ? 'visible' : 'hidden',
        }}
      >
        <ul className={style.microPortal_list_wrapper}>
          <li className={style.microPortal_list_delete} onDoubleClick={() => DeleteArticle()}>
            削除する
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MiniPortal;

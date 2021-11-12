import style from '@/styles/create.module.scss';
import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import isHotkey from 'is-hotkey';
import { ReactEditor, useSlate } from 'slate-react';

interface TitleProps {
  label: string;
  title: null | string;
  setTitle: (title: string | null) => void;
}

const Title = ({ label, title, setTitle }: TitleProps) => {
  const editor = useSlate();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const getStyle = () => {
    return title !== null ? style.input_container : `${style.input_container} ${style.is_loading}`;
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [title]);

  return (
    <div className={style.title_input_container}>
      <div className={getStyle()}>
        <textarea
          ref={textareaRef}
          autoComplete={`false`}
          rows={1}
          placeholder={`Untitled`}
          id='mainTitle'
          className={style.textarea_box}
          value={title ?? ''}
          onKeyDown={(e) => {
            const keys_ = {
              Enter: 'block',
              'mod+Enter': 'jump',
            };
            for (let hotkey in keys_) {
              if (isHotkey(hotkey, e as KeyboardEvent)) {
                if (hotkey === 'Enter') {
                  e.preventDefault();
                }
                if (hotkey === 'mod+Enter') {
                  e.preventDefault();
                  editor && ReactEditor.focus(editor);
                }
              }
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            e.preventDefault();
            setTitle(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Title;

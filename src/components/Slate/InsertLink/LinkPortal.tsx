import { Portal } from '@/components/Portal';
import style from '@/styles/create.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/store';
import axios from 'axios';
import { DragEvent } from 'react';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Range } from 'slate';
import { insertImage } from '../utils/block/InsertImage';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LinkProps {
  href: string;
  linkText: string;
}

const validationSchema = Yup.object().shape({
  href: Yup.string().url().required(),
  linkText: Yup.string().required(),
});

const LinkPortal = () => {
  const isOpenLinkPortal = useStore((state) => state.isOpenLinkPortal);
  const toggleLinkPortal = useStore((state) => state.toggleLinkPortal);

  const router = useRouter();
  const { id } = router.query;
  const editor = useSlate();

  const formik = useFormik<LinkProps>({
    initialValues: {
      href: '',
      linkText: (editor.selection && Editor.string(editor, editor.selection)) || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      InsertLink(values);
    },
  });

  const InsertLink = (values: LinkProps) => {
    const { href, linkText } = values;

    if (editor.selection && Range.isCollapsed(editor.selection)) {
      Transforms.insertNodes(editor, {
        type: 'link',
        href,
        children: [{ text: linkText }],
      });
    }

    formik.resetForm();
    toggleLinkPortal();
  };

  return (
    <Portal>
      <div
        style={{
          visibility: isOpenLinkPortal ? 'visible' : 'hidden',
          opacity: isOpenLinkPortal ? 1 : 0,
        }}
        className={style.portal_overlay}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleLinkPortal();
          formik.resetForm();
        }}
      >
        <div className={style.portal_container}>
          <div
            className={style.portal_uploadImage_content}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={style.portal_title_container}>
              <h2 className={style.portal_title}>リンクを挿入する</h2>
            </div>

            <div className={style.alt_input_wrapper}>
              <label htmlFor='link_href' className={style.alt_input_label}>
                リンク
              </label>
              <input
                className={style.alt_input}
                id='link_href'
                name='href'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.href}
              />
            </div>

            <div className={style.alt_input_wrapper}>
              <label htmlFor='linkText' className={style.alt_input_label}>
                リンクテキスト
              </label>
              <input
                className={style.alt_input}
                id='linkText'
                name='linkText'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linkText}
              />
            </div>

            <div className={style.insert_button_wrapper}>
              <button
                style={{
                  pointerEvents: formik.dirty && formik.isValid ? 'auto' : 'none',
                  opacity: formik.dirty && formik.isValid ? 1 : 0.8,
                }}
                className={style.insert_image_button}
                type='submit'
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                リンクを挿入する
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default LinkPortal;

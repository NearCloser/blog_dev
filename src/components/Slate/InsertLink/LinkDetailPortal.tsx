import { Portal } from '@/components/Portal';
import style from '@/styles/create.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/store';
import axios from 'axios';
import { DragEvent } from 'react';
import { useSlate } from 'slate-react';
import { Element as SlateElement, Editor, Transforms, Range, Node } from 'slate';
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

const LinkDetailPortal = () => {
  const isOpenLinkDetailPortal = useStore((state) => state.isOpenLinkDetailPortal);
  const toggleLinkDetailPortal = useStore((state) => state.toggleLinkDetailPortal);
  const setLinkElement = useStore((state) => state.setLinkElement);

  const linkPath = useStore((state) => state.linkPath);
  const linkElement = useStore((state) => state.linkElement);

  const router = useRouter();
  const { id } = router.query;
  const editor = useSlate();

  const formik = useFormik<LinkProps>({
    initialValues: {
      href: linkElement?.href || '',
      linkText: linkElement?.children[0].text || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      InsertLink(values);
    },
  });

  const InsertLink = (values: LinkProps) => {
    const { href, linkText } = values;
    if (!linkPath) return;
    Transforms.select(editor, linkPath);
    if (!editor.selection) return;

    Transforms.unwrapNodes(editor, {
      at: editor.selection,
      match: (node: Node) =>
        !Editor.isEditor(node) && SlateElement.isElement(node) && node.type === 'link',
    });

    Transforms.insertNodes(
      editor,
      {
        type: 'link',
        href,
        children: [{ text: linkText }],
      },
      { at: editor.selection, mode: 'highest' },
    );
    Transforms.collapse(editor, { edge: 'end' });

    formik.resetForm();
    toggleLinkDetailPortal();
  };

  return (
    <Portal>
      <div
        style={{
          visibility: isOpenLinkDetailPortal ? 'visible' : 'hidden',
          opacity: isOpenLinkDetailPortal ? 1 : 0,
        }}
        className={style.portal_overlay}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleLinkDetailPortal();
          formik.resetForm();
          setLinkElement(null, null);
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

export default LinkDetailPortal;

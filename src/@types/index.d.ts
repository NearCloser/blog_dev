import React from 'react';
import { BaseEditor, BaseSelection } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { TippyProps } from '@tippyjs/react';

export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

export type ParagraphElement = {
  type: 'paragraph';
  children: FormattedText[];
};

export type HeadingElement = {
  type: 'heading';
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  children: FormattedText[];
};

export type ItemListElement = {
  type: 'list-item';
  children: FormattedText[];
};

export type OrderedListElement = {
  type: 'ordered-list';
  children: ItemListElement[];
};

export type UnOrderedListElement = {
  type: 'bulleted-list';
  children: ItemListElement[];
};

export type QuoteElement = {
  type: 'block-quote';
  children: FormattedText[];
};

export type LinkElement = {
  type: 'link';
  href: string;
  children: FormattedText[];
};

export type CodeElement = {
  type: 'code';
  children: FormattedText;
};

export type ImageElement = {
  type: 'image';
  src: string;
  alt: string;
  children: [{ text: '' }];
};

export type LinkElement = {
  type: 'link';
  href: string;
  children: FormattedText[];
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export type CustomElement =
  | OrderedListElement
  | UnOrderedListElement
  | ItemListElement
  | ParagraphElement
  | HeadingElement
  | QuoteElement
  | LinkElement
  | ImageElement
  | CodeElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: FormattedText;
  }
}

export type FormatType =
  | 'heading'
  | 'paragraph'
  | 'block-quote'
  | 'link'
  | 'ordered-list'
  | 'bulleted-list'
  | 'list-item'
  | 'image'
  | 'code';

export type UserCustomHeadings = {
  level: HeadingElement['level'];
  display: string;
  fontSize: number;
}[];

export type FormattedTextMarkType = keyof Omit<FormattedText, 'text'>;
export interface CustomEditorInterface {
  toggleBlock: (
    editor: CustomEditor,
    options: {
      format: FormatType;
      isActive: boolean;
      level?: HeadingElement['level'];
      href?: string;
    },
  ) => void;
  insertImage: (
    editor: CustomEditor,
    options: {
      format: FormatType;
      src: string;
      alt?: string;
    },
  ) => void;
  toggleLinkBlock: (editor: CustomEditor, href: string, text: string) => void;
  SelectHeadings: (editor: CustomEditor, level: HeadingElement['level']) => void;
  toggleMark: (editor: CustomEditor, format: FormattedTextMarkType) => void;
  BlockButton: ({
    format,
    icon,
    tooltip,
  }: {
    format: FormatType;
    icon: any;
    tooltip: TippyProps;
  }) => React.ReactElement;
  MarkButton: ({
    format,
    icon,
    tooltip,
  }: {
    format: FormattedTextMarkType;
    icon: any;
    tooltip: TippyProps;
  }) => React.ReactElement;
  HeadingsSelectBlock: ({
    headings,
    cur,
  }: {
    headings: UserCustomHeadings;
    cur: HTMLDivElement | null;
  }) => React.ReactElement;
}

export declare const CustomControl: CustomEditorInterface;

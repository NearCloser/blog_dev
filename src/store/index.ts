import { BaseSelection, Descendant, Element, Path } from 'slate';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import moment from 'moment';
import type { LinkElement as SlateLinkElement } from '@/@types';

interface T {
  title: string | null;
  createdAt: string | null;
  categoryId: string | null;
  contents: Descendant[] | null;
  thumbnail: string | null;
  isOpenImagePortal: boolean;
  isOpenDeleteImagePortal: boolean;
  isOpenLinkPortal: boolean;
  isOpenLinkDetailPortal: boolean;
  selection: BaseSelection;
  linkElement: SlateLinkElement | null;
  linkPath: Path | null;
  setTitle: (title: string | null) => void;
  setCreatedAt: (createdAt: string | null) => void;
  setCategory: (categoryId: string | null) => void;
  setThumbnail: (thumbnail: string | null) => void;
  setContents: (contents: Descendant[] | null) => void;
  toggleImagePortal: () => void;
  toggleDeleteImagePortal: () => void;
  toggleLinkPortal: () => void;
  toggleLinkDetailPortal: () => void;
  setSelection: (selection: BaseSelection) => void;
  setLinkElement: (path: Path | null, linkElement: SlateLinkElement | null) => void;
}

const store = (set: SetState<T>, get: GetState<T>): T => ({
  title: '',
  createdAt: moment().format('YYYY-MM-DD'),
  categoryId: '',
  contents: null,
  thumbnail: null,
  isOpenImagePortal: false,
  isOpenDeleteImagePortal: false,
  isOpenLinkPortal: false,
  isOpenLinkDetailPortal: false,
  selection: null,
  linkElement: null,
  linkPath: null,
  setTitle: (title: string | null): void =>
    set((state) => ({
      ...state,
      title,
    })),
  setCreatedAt: (createdAt: string | null): void =>
    set((state) => ({
      ...state,
      createdAt,
    })),
  setCategory: (categoryId: string | null): void =>
    set((state) => ({
      ...state,
      categoryId,
    })),
  setContents: (contents: Descendant[] | null): void =>
    set((state) => ({
      ...state,
      contents,
    })),
  setThumbnail: (thumbnail: string | null): void =>
    set((state) => ({
      ...state,
      thumbnail,
    })),
  toggleImagePortal: () =>
    set((state) => ({
      ...state,
      isOpenImagePortal: !state.isOpenImagePortal,
    })),
  toggleDeleteImagePortal: () =>
    set((state) => ({
      ...state,
      isOpenDeleteImagePortal: !state.isOpenDeleteImagePortal,
    })),
  toggleLinkPortal: () =>
    set((state) => ({
      ...state,
      isOpenLinkPortal: !state.isOpenLinkPortal,
    })),
  toggleLinkDetailPortal: () =>
    set((state) => ({
      ...state,
      isOpenLinkDetailPortal: !state.isOpenLinkDetailPortal,
    })),
  setSelection: (selection: BaseSelection) =>
    set((state) => ({
      ...state,
      selection,
    })),
  setLinkElement: (linkPath: Path | null, linkElement: SlateLinkElement | null) =>
    set((state) => ({
      ...state,
      linkElement,
      linkPath,
    })),
});

export const useStore = create<T>(devtools(store));

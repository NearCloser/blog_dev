import { Descendant } from "slate";
import create, { GetState, SetState } from "zustand";
import { devtools } from "zustand/middleware";
import moment from "moment";

interface T {
  title: string | null;
  createdAt: string | null;
  contents: Descendant[] | null;
  isOpenImagePortal: boolean;
  setTitle: (title: string | null) => void;
  setCreatedAt: (createdAt: string | null) => void;
  setContents: (contents: Descendant[] | null) => void;
  toggleImagePortal: () => void;
}

const store = (set: SetState<T>, get: GetState<T>): T => ({
  title: "",
  createdAt: moment().format("YYYY-MM-DD"),
  contents: null,
  isOpenImagePortal: false,
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
  setContents: (contents: Descendant[] | null): void =>
    set((state) => ({
      ...state,
      contents,
    })),
  toggleImagePortal: () =>
    set((state) => ({
      ...state,
      isOpenImagePortal: !state.isOpenImagePortal,
    })),
});

export const useStore = create(devtools(store));

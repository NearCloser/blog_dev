import { Descendant } from "slate";
import create, { GetState, SetState } from "zustand";
import { devtools } from "zustand/middleware";
import moment from "moment";

interface T {
  title: string;
  createdAt: string;
  contents: Descendant[];
  isOpenImagePortal: boolean;
  setTitle: (title: string) => void;
  setCreatedAt: (createdAt: string) => void;
  setContents: (contents: Descendant[]) => void;
  toggleImagePortal: () => void;
}

const store = (set: SetState<T>, get: GetState<T>): T => ({
  title: "",
  createdAt: moment().format("YYYY-MM-DD"),
  contents: [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ],
  isOpenImagePortal: false,
  setTitle: (title: string): void =>
    set((state) => ({
      ...state,
      title,
    })),
  setCreatedAt: (createdAt: string): void =>
    set((state) => ({
      ...state,
      createdAt,
    })),
  setContents: (contents: Descendant[]): void =>
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

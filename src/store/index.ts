import { Descendant } from "slate";
import create, { GetState, SetState } from "zustand";
import { devtools } from "zustand/middleware";
import moment from "moment";

interface T {
  title: string;
  createdAt: string;
  contents: Descendant[];
  setTitle: (title: string) => void;
  setCreatedAt: (createdAt: string) => void;
  setContents: (contents: Descendant[]) => void;
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
});

export const useStore = create(devtools(store));

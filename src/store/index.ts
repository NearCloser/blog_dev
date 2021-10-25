import { Descendant } from "slate";
import create, { SetState, GetState } from "zustand";
import { devtools } from "zustand/middleware";
import moment from "moment";
import { CustomElement } from "@/@types";

interface ArticleProps {
  title: string;
  createdAt: string;
  contents: CustomElement[];
  setTitle: (title: string) => void;
  setCreatedAt: (createdAt: string) => void;
  setContents: (contents: Descendant[]) => void;
}

export const Store = (set: SetState<ArticleProps>) => ({
  title: "",
  createdAt: moment().format("YYYY-MM-DD"),
  contents: [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ],
  setTitle: (titleInputs: string) =>
    set((state) => {
      return {
        ...state,
        title: titleInputs,
      };
    }),
  setCreatedAt: (createdAtInputs: string) =>
    set((state) => {
      return {
        ...state,
        createdAt: createdAtInputs,
      };
    }),
  setContents: (contentsInputs: CustomElement[]) =>
    set((state) => {
      return {
        ...state,
        contents: contentsInputs,
      };
    }),
});

export const useStore = create<ArticleProps>(devtools(Store));

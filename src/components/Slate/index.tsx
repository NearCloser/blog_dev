import isHotkey from "is-hotkey";
import React, { useCallback, useState, KeyboardEvent, useRef } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, withReact, Slate, RenderLeafProps } from "slate-react";
import { LeafKeys } from "./command/leaf";
import { toggleMark } from "./utils";
import { RenderElement } from "./render/element";
import { RenderLeaf } from "./render/leaf";
import { CustomEditor } from "@/@types";
import style from "@/styles/create.module.scss";
import SlateNavigation from "./navigation";
import { useStore } from "@/store";

const withLinks = (editor: Editor) => {
  const { isInline, normalizeNode } = editor;

  editor.isInline = (elm) => {
    return elm.type === "link" ? true : isInline(elm);
  };

  editor.normalizeNode = (entry) => {
    const [node] = entry;

    if (SlateElement.isElement(node) && node.type === "link") {
    }
    normalizeNode(entry);
  };

  return editor;
};

const RichTextEditor = () => {
  const contents = useStore((state) => state.contents);
  const setContents = useStore((state) => state.setContents);

  const editorRef = useRef<CustomEditor>();
  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RenderLeaf {...props} />,
    []
  );
  if (!editorRef.current)
    editorRef.current = withLinks(withHistory(withReact(createEditor())));
  const editor = editorRef.current;

  return (
    <>
      {contents && (
        <Slate
          editor={editor}
          value={contents}
          onChange={(value) => setContents(value)}
        >
          <SlateNavigation />
          <div className={style.slate_editor_main_wrapper}>
            <Editable
              className={style.slate_editor_wrapper}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="ブログを書いてみよう"
              autoCapitalize="false"
              spellCheck="false"
              autoCorrect="false"
              autoFocus
              // onKeyDown={(e) => {
              //   for (const hotkey in LeafKeys) {
              //     if (isHotkey(hotkey, e as KeyboardEvent)) {
              //       const mark = LeafKeys[hotkey];
              //       toggleMark(editor, mark);
              //     }
              //   }
              // }}
            />
          </div>
        </Slate>
      )}
    </>
  );
};

export default RichTextEditor;

import isHotkey from "is-hotkey";
import React, { useCallback, useState, KeyboardEvent, useRef } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Range,
  Path,
  Node,
  Transforms,
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

const withFloat = (editor: Editor) => {
  const { isInline, normalizeNode, isVoid, insertBreak, deleteBackward } =
    editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertBreak = () => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak();
    }

    const selectedNodePath = Path.parent(editor.selection.anchor.path);
    const selectedNode = Node.get(editor, selectedNodePath);
    if (Editor.isVoid(editor, selectedNode)) {
      console.log(selectedNode);
      Editor.insertNode(editor, {
        type: "paragraph",
        children: [{ text: "" }],
      });
      return;
    }

    insertBreak();
  };

  editor.deleteBackward = (unit) => {
    if (
      !editor.selection ||
      !Range.isCollapsed(editor.selection) ||
      editor.selection.anchor.offset !== 0
    ) {
      return deleteBackward(unit);
    }

    const parentPath = Path.parent(editor.selection.anchor.path);
    const parentNode = Node.get(editor, parentPath);
    const parentIsEmpty = Node.string(parentNode).length === 0;

    if (parentIsEmpty && Path.hasPrevious(parentPath)) {
      const prevNodePath = Path.previous(parentPath);
      const prevNode = Node.get(editor, prevNodePath);
      if (Editor.isVoid(editor, prevNode)) {
        return Transforms.removeNodes(editor);
      }
    }

    deleteBackward(unit);
  };

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
    editorRef.current = withFloat(withHistory(withReact(createEditor())));
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

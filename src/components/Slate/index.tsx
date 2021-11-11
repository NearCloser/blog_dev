import isHotkey from 'is-hotkey';
import React, { useCallback, useState, KeyboardEvent, useRef } from 'react';
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Range,
  Path,
  Node,
  Transforms,
} from 'slate';
import { withHistory } from 'slate-history';
import { Editable, withReact, Slate, RenderLeafProps, ReactEditor } from 'slate-react';
import { LeafKeys } from './command/leaf';
import { toggleMark } from './utils';
import { RenderElement } from './render/element';
import { RenderLeaf } from './render/leaf';
import type {
  CustomEditor,
  CustomElement,
  FormattedTextMarkType,
  FormatType,
  HeadingElement,
  ParagraphElement,
  TitleElement,
} from '@/@types';
import style from '@/styles/create.module.scss';
import SlateNavigation from './navigation';
import { useStore } from '@/store';
import { Title } from '@/components';

const withFloat = (editor: Editor) => {
  const { isInline, normalizeNode, isVoid, insertBreak, deleteBackward } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' || element.type === 'code' ? true : isVoid(element);
  };

  editor.insertBreak = () => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak();
    }

    const selectedNodePath = Path.parent(editor.selection.anchor.path);
    const selectedNode = Node.get(editor, selectedNodePath);
    if (Editor.isVoid(editor, selectedNode)) {
      Editor.insertNode(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
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
    return elm.type === 'link' ? true : isInline(elm);
  };

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (path.length === 0) {
      for (const [child, childPath] of Node.children(editor, path)) {
        const slateIndex = childPath[0];
        const enforceType = (type: FormatType) => {
          if (SlateElement.isElement(child) && child.type !== type) {
            const newProperties: Partial<SlateElement> = { type };
            Transforms.setNodes<SlateElement>(editor, newProperties, {
              at: childPath,
            });
          }
        };

        switch (slateIndex) {
          case 0:
            enforceType('title');
            break;
          case 1:
            enforceType('paragraph');
          default:
            break;
        }
      }
    }
    normalizeNode([node, path]);
  };

  return editor;
};

const RichTextEditor = () => {
  const contents = useStore((state) => state.contents);
  const setContents = useStore((state) => state.setContents);

  const editorRef = useRef<CustomEditor>();
  const renderElement = useCallback((props) => <RenderElement {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <RenderLeaf {...props} />, []);
  if (!editorRef.current) editorRef.current = withFloat(withHistory(withReact(createEditor())));
  const editor = editorRef.current;

  return (
    <>
      {contents && (
        <Slate editor={editor} value={contents} onChange={(value) => setContents(value)}>
          <SlateNavigation />
          <div
            className={style.slate_editor_main_wrapper}
            onClick={() => {
              editor && ReactEditor.focus(editor);
            }}
          >
            <Editable
              className={style.slate_editor_wrapper}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder='ブログを書いてみよう'
              autoCapitalize='false'
              spellCheck='false'
              autoCorrect='false'
              autoFocus
              onKeyDown={(e) => {
                for (let hotkey in LeafKeys) {
                  if (isHotkey(hotkey, e as KeyboardEvent)) {
                    if (hotkey === 'mod+Enter') {
                      return Editor.insertText(editor, '\n');
                    }
                    //@ts-ignore
                    const format: FormattedTextMarkType = LeafKeys[hotkey];
                    toggleMark(editor, format);
                  }
                }
              }}
            />
          </div>
        </Slate>
      )}
    </>
  );
};

export default RichTextEditor;

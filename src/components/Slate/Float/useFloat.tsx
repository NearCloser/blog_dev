import { useCallback, useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
import { Editor, Range, Location } from 'slate';
import { useStore } from '@/store';

export const getText = (editor: Editor, at?: Location | null) =>
  (at && Editor.string(editor, at)) ?? '';

export const getSelectionText = (editor: Editor) => getText(editor, editor.selection);
export const isSelectionExpanded = (editor: Editor) => isExpanded(editor.selection);
export const isExpanded = (range?: Range | null) => !!range && Range.isExpanded(range);

/**
 * set when the selection changes.
 */
export const useFloat = ({
  editor,
  ref,
  direction,
}: {
  editor?: Editor;
  ref: any;
  direction: 'top' | 'bottom';
}) => {
  const selectionExpanded = editor && isSelectionExpanded(editor);
  const selectionText = editor && getSelectionText(editor);
  const setSelection = useStore((state) => state.setSelection);

  useEffect(() => {
    ref.current && selectionExpanded && setPositionAtSelection(ref.current, direction);
    editor && selectionExpanded && setSelection(editor?.selection);
  }, [editor, setSelection, direction, selectionText?.length, selectionExpanded, ref]);
};

export const setPositionAtSelection = (el: HTMLElement, direction: 'top' | 'bottom' = 'top') => {
  const domSelection = window.getSelection();
  if (!domSelection || domSelection.rangeCount < 1) return;

  const domRange = domSelection.getRangeAt(0);
  const rect = domRange.getBoundingClientRect();

  if (direction === 'top') {
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
  } else {
    el.style.top = `${rect.bottom + window.pageYOffset}px`;
  }
  el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
};

export const useFloatVisible = ({ editor, ref }: { editor?: Editor; ref: any }) => {
  const [hidden, setHidden] = useState(true);

  const selectionExpanded = editor && isSelectionExpanded(editor);
  const selectionText = editor && getSelectionText(editor);
  const setSelection = useStore((state) => state.setSelection);

  const show = useCallback(() => {
    if (ref.current && hidden && selectionExpanded) {
      setHidden(false);
    }
  }, [hidden, ref, selectionExpanded]);

  useEffect(() => {
    show();
  }, [setSelection, show, selectionText?.length]);

  useEffect(() => {
    if (!hidden && !selectionExpanded) {
      setHidden(true);
      setSelection(null);
      if (ref.current) {
        ref.current.removeAttribute('style');
      }
    }
  }, [setSelection, hidden, selectionExpanded, selectionText?.length, show, ref]);

  return [hidden];
};

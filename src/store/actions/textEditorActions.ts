import { PayloadAction } from "@reduxjs/toolkit";

import { TextEditorContentFormat } from "../../components/TextEditor";
import { TextEditorState } from "../types";

export const updateTextEditorAction = (
  state: TextEditorState,
  {
    payload,
  }: PayloadAction<{ content: string; formats: Set<TextEditorContentFormat> }>,
) => {
  const { content, formats: rawFormats } = payload;
  const formats = Array.from(rawFormats);

  if (state.currentUpdate < state.updates.length - 1) {
    const slicedUpdates = state.updates.slice(0, state.currentUpdate + 1);
    slicedUpdates.push({ content, formats });
    state.updates = slicedUpdates;
    state.currentUpdate = state.updates.length - 1;
    return;
  }

  state.updates.push({ content, formats });
  state.currentUpdate += 1;
};

export const undoTextEditorAction = (state: TextEditorState) => {
  if (state.currentUpdate > 0) state.currentUpdate -= 1;
};

export const redoTextEditorAction = (state: TextEditorState) => {
  if (state.currentUpdate < state.updates.length - 1) state.currentUpdate += 1;
};

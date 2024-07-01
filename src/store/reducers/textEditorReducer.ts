import { createSlice } from "@reduxjs/toolkit";

import {
  redoTextEditorAction,
  undoTextEditorAction,
  updateTextEditorAction,
} from "../actions/textEditorActions";
import { TextEditorState } from "../types";

const initialState: TextEditorState = {
  updates: [],
  currentUpdate: 0,
};

export const textEditorSlice = createSlice({
  name: "textEditor",
  initialState,
  reducers: {
    updateTextEditor: updateTextEditorAction,
    undoTextEditor: undoTextEditorAction,
    redoTextEditor: redoTextEditorAction,
  },
});

export const { updateTextEditor, undoTextEditor, redoTextEditor } =
  textEditorSlice.actions;

export const textEditorReducer = textEditorSlice.reducer;

import { TextEditorContentFormat } from "../components/TextEditor";

export interface TextEditorUpdate {
  content: string;
  formats: TextEditorContentFormat[];
}

export interface TextEditorState {
  updates: TextEditorUpdate[];
  currentUpdate: number;
}

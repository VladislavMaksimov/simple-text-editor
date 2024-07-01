import { TextEditorContentFormat } from "../types";

export const mapTextEditorContentToHTML = (
  content: string,
  formats: Set<TextEditorContentFormat>,
) => {
  if (formats.has("bold") && formats.has("italic")) {
    return (
      <b>
        <i>{content}</i>
      </b>
    );
  }

  if (formats.has("bold")) {
    return <b>{content}</b>;
  }

  if (formats.has("italic")) {
    return <i>{content}</i>;
  }

  return <span style={{ whiteSpace: "pre-wrap" }}>{content}</span>;
};

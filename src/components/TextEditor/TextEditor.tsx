import { FC, HTMLAttributes } from "react";
import { Button, ButtonGroup, Form, Stack } from "react-bootstrap";

import { OmitChildren } from "../../utils/types";
import { TextEditorContentFormat } from "./types";

interface TextEditorProps
  extends OmitChildren<HTMLAttributes<HTMLFormElement>> {
  value: string;
  formats: Set<TextEditorContentFormat>;

  onChangeValue: (value: string) => void;
  onToggleFormat: (format: TextEditorContentFormat) => void;
  onUndo: VoidFunction;
  onRedo: VoidFunction;
}

export const TextEditor: FC<TextEditorProps> = ({
  value,
  formats,
  onChangeValue,
  onToggleFormat,
  onUndo,
  onRedo,
  ...props
}) => {
  return (
    <Form {...props}>
      <Stack gap={2}>
        <Form.Control
          as="textarea"
          rows={3}
          value={value}
          onChange={(e) => {
            onChangeValue(e.target.value);
          }}
        />

        <Stack className="justify-content-between" direction="horizontal">
          <ButtonGroup aria-label="History actions">
            <Button variant="secondary" onClick={onUndo}>
              Undo
            </Button>
            <Button variant="secondary" onClick={onRedo}>
              Redo
            </Button>
          </ButtonGroup>

          <ButtonGroup aria-label="Formatting text">
            <Button
              variant={formats.has("bold") ? "secondary" : "primary"}
              onClick={() => {
                onToggleFormat("bold");
              }}
            >
              Bold
            </Button>
            <Button
              variant={formats.has("italic") ? "secondary" : "primary"}
              onClick={() => {
                onToggleFormat("italic");
              }}
            >
              Italic
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Form>
  );
};

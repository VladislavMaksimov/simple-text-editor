import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { useDebounce } from "use-debounce";

import {
  TextEditor,
  TextEditorContentFormat,
  mapTextEditorContentToHTML,
} from "../components/TextEditor";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useAppSelector } from "../store/hooks/useAppSelector";
import {
  redoTextEditor,
  undoTextEditor,
  updateTextEditor,
} from "../store/reducers/textEditorReducer";

export const TextEditorPage = () => {
  const dispatch = useAppDispatch();

  const { updates, currentUpdate } = useAppSelector(
    (state) => state.textEditor,
  );
  console.log(updates);
  const [value, setValue] = useState<string>("");
  const [formats, setFormats] = useState<Set<TextEditorContentFormat>>(
    new Set(),
  );

  const [valueUpdate] = useDebounce(value, 1000);
  const updatingRef = useRef(false);
  const firstRenderingRef = useRef(true);

  useEffect(() => {
    if (firstRenderingRef.current && formats.size === 0 && valueUpdate === "") {
      return;
    }

    if (updatingRef.current === true) {
      updatingRef.current = false;
      return;
    }

    dispatch(updateTextEditor({ content: valueUpdate, formats }));
  }, [dispatch, formats, valueUpdate]);

  useEffect(() => {
    if (!updatingRef.current || !updates[currentUpdate]) return;
    setValue(updates[currentUpdate].content);
    setFormats(new Set(updates[currentUpdate].formats));
  }, [currentUpdate, updates]);

  const onToggleFormat = (format: TextEditorContentFormat) => {
    setFormats((prev) => {
      const newFormats = new Set(prev);

      if (newFormats.has(format)) {
        newFormats.delete(format);
        return newFormats;
      }

      newFormats.add(format);
      return newFormats;
    });
  };

  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center">
        <Col className="d-flex justify-content-center">
          <Stack className="align-items-start" direction="horizontal" gap={3}>
            <Stack gap={2}>
              <h3>Text Editor</h3>
              <TextEditor
                style={{ width: 300 }}
                value={value}
                formats={formats}
                onChangeValue={(value) => {
                  setValue(value);
                }}
                onToggleFormat={onToggleFormat}
                onUndo={() => {
                  updatingRef.current = true;
                  dispatch(undoTextEditor());
                }}
                onRedo={() => {
                  updatingRef.current = true;
                  dispatch(redoTextEditor());
                }}
              />
            </Stack>
            <Stack gap={2}>
              <h3>Preview</h3>
              <Card
                style={{ width: 300, maxHeight: 200 }}
                className="text-break overflow-auto"
              >
                <Card.Body>
                  {mapTextEditorContentToHTML(value, formats)}
                </Card.Body>
              </Card>
            </Stack>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

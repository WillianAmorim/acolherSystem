import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

interface RichTextEditorProps {
  value: string; // O conteúdo inicial
  onChange: (data: string) => void; // Callback para capturar alterações no editor
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "|",
          "link",
          "insertTable",
          "mediaEmbed",
          "|",
          "bulletedList",
          "numberedList",
          "indent",
          "outdent",
        ],
        plugins: [
          Bold,
          Essentials,
          Heading,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          MediaEmbed,
          Paragraph,
          Table,
          Undo,
        ],
        initialData: value,
      }}
      data={value} // Define o valor inicial do editor
      onChange={(_, editor) => {
        // Omitindo o `event` já que ele não é usado
        const data = editor.getData(); // Obtém os dados do editor
        onChange(data); // Envia para o callback
      }}
    />
  );
};

export default RichTextEditor;

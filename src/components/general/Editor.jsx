import React from "react";
import { Editor as ClassicEditor } from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomUploadAdapterPlugin from "../../utils/MyCustomUploadAdapter";

const Editor = ({ name, errors, label, register, setValue, defaultValue }) => {
  function SpecialCharactersEmoji(editor) {
    editor.plugins.get("SpecialCharacters").addItems(
      "Emoji",
      [
        { title: "heart", character: "[`U+2764`]" },
        { title: "Dim", character: "[`U+1F505`]" },
        { title: "Star", character: "[`U+1F31F`]" },
        { title: "Time", character: "[`U+23F2`]" },
        { title: "Mango", character: "[`U+1F96D`]" },
        { title: "Tree", character: "[`U+1F334`]" },
        { title: "Leaf", character: "[`U+1F340`]" },
        { title: "Stop", character: "[`U+1F6D1`]" },
        { title: "Peach", character: "[`U+1F351`]" },
        { title: "spice", character: "[`U+1F4A5`]" },
        { title: "apple", character: "[`U+1F34E`]" },
        { title: "banana", character: "[`U+1F34C`]" },
        { title: "graps", character: "[`U+1F347`]" },
        { title: "pear", character: "[`U+1F350`]" },
        { title: "melon", character: "[`U+1F348`]" },
        { title: "Strawberry", character: "[`U+1F353`]" },
        { title: "Bacon", character: "[`U+1F953`]" },
      ],
      { label: "Emoticons" }
    );
  }
  return (
    <div className="w-[99%] max-w-[100%] break-words">
      <p className="text-[#8F8F8F] text-sm font-medium px-2 capitalize relative z-0 mb-3">
        {label}
      </p>
      <CKEditor
        activeClass="p10"
        editor={ClassicEditor}
        data={defaultValue}
        config={{
          extraPlugins: [CustomUploadAdapterPlugin, SpecialCharactersEmoji], // Add the custom upload adapter plugin
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(name, data);
        }}
      />
      {errors && errors[name] && (
        <p className="text-tiny text-danger pl-3 mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default Editor;

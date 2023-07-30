"use client";
import { useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogPostEditorPage = () => {
  const [text, setText] = useState<string>("");
  console.log(text);

  return (
    <div className="mt-12 w-full flex">
      <div className="w-full p-1 rounded-lg shadow-lg border">
        {/* <ReactQuill
          className="w-full"
          theme="snow"
          value={text}
          onChange={setText}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          }}
        /> */}
      </div>
    </div>
  );
};

export default BlogPostEditorPage;

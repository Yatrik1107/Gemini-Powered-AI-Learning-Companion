import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Form, Spin, message } from "antd";
import SuggestionBlot from "./SuggestionBlot"; // Import the custom blot

const { GoogleGenerativeAI } = require("@google/generative-ai");

const EditNotePage = ({ notes, editNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reactQuillRef = useRef();
  const note = notes.find((note) => note.id === parseInt(id, 10));

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  const [suggestion, setSuggestion] = useState("");

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      editNote(note.id, { title, content });
      navigate("/");
    } else {
      message.error("Title and content cannot be empty!");
    }
  };

  const insertIntoEditor = (text) => {
    const editor = reactQuillRef.current.getEditor();
    const range = editor.getSelection();
    const position = range ? range.index : editor.getLength();
    editor.insertText(position, text);
    // Optionally, move cursor after the inserted text
    editor.setSelection(position + text.length, 0);
  };

  const apiCall = async (values) => {
    setLoading(true);
    const { title } = values;
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyCtB-0sS5VgJRNa3vIpIj7i2bNnc66KREQ"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(title);
      const suggestionText = result.response.text(); // Adjust based on actual API response structure
      setSuggestion(suggestionText);
      setLoading(false);
      message.success("AI suggestion generated!");
    } catch (error) {
      console.error("Error generating AI suggestion:", error);
      message.error("Failed to generate AI suggestion.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const acceptSuggestion = () => {
    if (suggestion.trim()) {
      insertIntoEditor(suggestion);
      setSuggestion("");
      message.success("Suggestion accepted and inserted into the editor.");
    }
  };

  const rejectSuggestion = () => {
    setSuggestion("");
    message.info("Suggestion rejected.");
  };

  const regenerateSuggestion = async () => {
    await apiCall(form.getFieldsValue());
    message.info("Regenerating suggestion...");
  };

  return (
    <Spin spinning={loading}>
      <div className="edit-note-page p-4">
        <div className="edit-note-header mb-4">
          <h1>Edit Note</h1>
        </div>
        <div className="note-container">
          <div className="flex justify-between gap-1 mb-4">
            <Form form={form} onFinish={apiCall} className="w-full">
              <Form.Item
                name="title"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
              >
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title"
                  className="note-title-input"
                  addonAfter={
                    <Button htmlType="submit" type="primary">
                      AI Suggest
                    </Button>
                  }
                />
              </Form.Item>
            </Form>
          </div>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="note-content-editor"
            ref={reactQuillRef}
            theme="snow"
            placeholder="Write your note here..."
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>
        {suggestion && (
          <div className="suggestion-container mt-4 p-4 bg-yellow-100 rounded">
            <p className="mb-2">{suggestion}</p>
            <div className="flex gap-2">
              <Button type="primary" onClick={acceptSuggestion}>
                Accept
              </Button>
              <Button onClick={rejectSuggestion}>Reject</Button>
              <Button onClick={regenerateSuggestion} type="dashed">
                Regenerate
              </Button>
            </div>
          </div>
        )}
        <div className="flex justify-end w-full mt-6 gap-2">
          <Button onClick={handleCancel} className="cancel-button">
            Cancel
          </Button>
          <Button type="primary" onClick={handleSave} className="save-button">
            Save
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default EditNotePage;

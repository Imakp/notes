import React, { useState } from "react";

const AddNodeModal = ({ onClose, onAddNode, existingNodes }) => {
  const [nodeId, setNodeId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [parentKey, setParentKey] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!nodeId) newErrors.id = "ID is required";
    if (!keyword) newErrors.keyword = "Keyword is required";
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "Content is required";

    if (existingNodes?.some((node) => node.id === nodeId)) {
      newErrors.id = "This ID already exists";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddNode = () => {
    if (validate()) {
      const newNode = {
        id: nodeId,
        keyword,
        title,
        parentKey,
        content,
      };
      onAddNode(newNode);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Add New Node</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Node ID</label>
          <input
            type="text"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
            placeholder="Enter unique ID (e.g., '1', '2')"
            className="border p-2 w-full"
          />
          {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Parent ID</label>
          <input
            type="text"
            value={parentKey}
            onChange={(e) => setParentKey(e.target.value)}
            placeholder="Enter parent node ID (optional)"
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Keyword"
            className="border p-2 w-full"
          />
          {errors.keyword && (
            <p className="text-red-500 text-sm">{errors.keyword}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="border p-2 w-full"
            rows={4}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddNode}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Node
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNodeModal;

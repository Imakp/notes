import React, { useState, useEffect, useCallback } from "react";
import AddNodeModal from "../components/AddNodeModal";
import Graph from "../components/Graph";
import useGraph from "../hooks/useGraph";

const TileView = () => {
  const { nodes, addNode, updateNode, deleteNode } = useGraph();
  const [showModal, setShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 600,
  });

  // Handle window resize with debounce
  const handleResize = useCallback(() => {
    const navbarHeight = 64; // Height of the navbar
    const padding = 32; // Padding around the graph

    setDimensions({
      width: window.innerWidth - padding,
      height: window.innerHeight - navbarHeight - padding,
    });
  }, []);

  // Initial size calculation and resize listener
  useEffect(() => {
    handleResize(); // Set initial size

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleUpdateNode = (updatedNode) => {
    updateNode(updatedNode);
    setSelectedNode(null);
  };

  const handleDeleteNode = (nodeId) => {
    deleteNode(nodeId);
    setSelectedNode(null);
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <Graph
          nodes={nodes.nodes}
          links={nodes.links}
          onNodeClick={handleNodeClick}
          onNodePositionChange={updateNode}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>

      {/* Add Node Button */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors duration-200"
        onClick={() => setShowModal(true)}
        aria-label="Add node"
      >
        <span>+</span>
      </button>

      {/* Modals */}
      {showModal && (
        <AddNodeModal
          onClose={() => setShowModal(false)}
          onAddNode={addNode}
          existingNodes={nodes.nodes} // Pass existing nodes for ID validation
        />
      )}

      {selectedNode && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Edit Node</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keyword
                  </label>
                  <input
                    type="text"
                    value={selectedNode.keyword}
                    onChange={(e) =>
                      setSelectedNode({
                        ...selectedNode,
                        keyword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={selectedNode.title}
                    onChange={(e) =>
                      setSelectedNode({
                        ...selectedNode,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={selectedNode.content}
                    onChange={(e) =>
                      setSelectedNode({
                        ...selectedNode,
                        content: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateNode(selectedNode)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteNode(selectedNode.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TileView;

import React, { createContext, useState, useEffect } from "react";

export const GraphContext = createContext();

const GraphProvider = ({ children }) => {
  // Initialize state with proper default values
  const [nodes, setNodes] = useState(() => {
    try {
      const savedData = localStorage.getItem("nodes");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Ensure parsed nodes have valid x/y if present
        return {
          nodes: parsedData.nodes.map((n) => ({
            ...n,
            x: n.x || Math.random() * 500, // Fallback for migration
            y: n.y || Math.random() * 500,
          })),
          links: parsedData.links,
        };
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
    // Default empty state if no saved data or error occurs
    return {
      nodes: [],
      links: [],
    };
  });

  // Save to localStorage whenever nodes change
  useEffect(() => {
    try {
      localStorage.setItem("nodes", JSON.stringify(nodes));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [nodes]);

  const addNode = (newNode) => {
    setNodes((prevState) => {
      // Ensure we have valid arrays to work with
      const currentNodes = Array.isArray(prevState.nodes)
        ? prevState.nodes
        : [];
      const currentLinks = Array.isArray(prevState.links)
        ? prevState.links
        : [];

      // Create new node
      const nodeToAdd = {
        ...newNode,
        id: newNode.id || Date.now().toString(),
      };

      // Create new links if there's a parent
      let newLinks = [...currentLinks];
      if (newNode.parentKey) {
        const parentNode = currentNodes.find(
          (node) => node.id === newNode.parentKey
        );
        if (parentNode) {
          newLinks.push({
            source: parentNode,
            target: nodeToAdd,
          });
        }
      }

      return {
        nodes: [...currentNodes, nodeToAdd],
        links: newLinks,
      };
    });
  };

  const updateNode = (updatedNode) => {
    setNodes((prevState) => {
      const currentNodes = Array.isArray(prevState.nodes)
        ? prevState.nodes
        : [];
      const currentLinks = Array.isArray(prevState.links)
        ? prevState.links
        : [];

      return {
        nodes: currentNodes.map((node) =>
          node.id === updatedNode.id ? updatedNode : node
        ),
        links: currentLinks,
      };
    });
  };

  const deleteNode = (nodeId) => {
    setNodes((prevState) => {
      const currentNodes = Array.isArray(prevState.nodes)
        ? prevState.nodes
        : [];
      const currentLinks = Array.isArray(prevState.links)
        ? prevState.links
        : [];

      return {
        nodes: currentNodes.filter((node) => node.id !== nodeId),
        links: currentLinks.filter(
          (link) => link.source !== nodeId && link.target !== nodeId
        ),
      };
    });
  };

  const value = {
    nodes,
    addNode,
    updateNode,
    deleteNode,
  };

  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  );
};

export default GraphProvider;

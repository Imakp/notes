import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Graph = ({
  nodes = [],
  links = [],
  onNodeClick,
  width = 800,
  height = 600,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    // Guard against empty data
    if (!nodes.length) return;

    const svg = d3.select(svgRef.current);

    // Clear previous SVG content
    svg.selectAll("*").remove();

    // Create a group for the zoom functionality
    const g = svg.append("g");

    // Initialize zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Initialize force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    // Create links
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    // Create node groups
    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#69b3a2")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Add keyword labels
    node
      .append("text")
      .text((d) => d.keyword)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "white")
      .style("font-size", "12px")
      .style("pointer-events", "none");

    // Add hover tooltips
    node.append("title").text((d) => `${d.keyword}\n${d.title}`);

    // Handle node click events
    node.on("click", (event, d) => {
      event.stopPropagation();
      onNodeClick(d);
    });

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Clean up
    return () => {
      simulation.stop();
    };
  }, [nodes, links, width, height, onNodeClick]);

  // Empty state
  if (!nodes.length) {
    return (
      <svg ref={svgRef} width={width} height={height} className="bg-gray-50">
        <text x="50%" y="50%" textAnchor="middle" className="text-gray-400">
          No nodes available. Click + to add a node.
        </text>
      </svg>
    );
  }

  return (
    <svg ref={svgRef} width={width} height={height} className="bg-gray-50" />
  );
};

export default Graph;

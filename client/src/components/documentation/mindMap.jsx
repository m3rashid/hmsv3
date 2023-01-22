import { FlowAnalysisGraph } from "@ant-design/graphs";
import { configState } from "atoms/config";
import React from "react";
import { useRecoilValue } from "recoil";

const MindMapGraph = () => {
  const config = useRecoilValue(configState);

  const data = {
    nodes: [
      {
        id: "0",
        value: { title: "Patient Enters", items: [{ text: "Patient" }] },
      },
      {
        id: "1",
        value: {
          title: "Receptionist",
          items: [{ text: "Create an appointment" }],
        },
      },
      {
        id: "2",
        value: { title: "Co Admin", items: [{ text: "Register patient" }] },
      },
      {
        id: "3",
        value: { title: "Doctor", items: [{ text: "Diagnose patient" }] },
      },
      {
        id: "4",
        value: {
          title: "Pharmacist",
          items: [{ text: "Prescribe medication" }],
        },
      },
      {
        id: "5",
        value: {
          title: "Inventory Manager",
          items: [{ text: "Dispense medication" }],
        },
      },
    ],
    edges: [
      { source: "0", target: "1", value: "Registered" },
      { source: "0", target: "2", value: "Not Registered" },
      { source: "2", target: "1", value: "Create Appointment" },
      { source: "1", target: "3", value: "Appointment" },
      { source: "3", target: "4", value: "Medication" },
      { source: "4", target: "5", value: "Dispense Medicine" },
    ],
  };

  return (
    <FlowAnalysisGraph
      {...{
        data,
        nodeCfg: {
          size: [160, 30],
          badge: {
            style: (cfg) => {
              return {
                fill: config.app_theme_color,
                radius: [2, 0, 0, 2],
              };
            },
          },
          items: {
            containerStyle: {
              fill: config.app_light_color,
              radius: [2, 2, 2, 2],
            },
            padding: 6,
            style: (cfg, group, type) => {
              const styles = {
                icon: { width: 12, height: 12 },
                value: { fill: config.app_theme_color },
                text: { fill: "#aaa" },
              };
              return styles[type];
            },
          },
          nodeStateStyles: {
            hover: { stroke: config.app_theme_color, lineWidth: 2 },
          },
          title: {
            containerStyle: {
              fill: "transparent",
            },
            style: {
              fill: "#000",
              fontSize: 12,
            },
          },
          style: {
            fill: "#E6EAF1",
            stroke: config.app_theme_color,
            radius: [2, 2, 2, 2],
          },
        },
        edgeCfg: {
          label: {
            style: {
              fill: config.app_dark_color,
              fontSize: 12,
              fillOpacity: 1,
            },
          },
          style: (edge) => {
            const stroke = config.app_theme_color;
            return {
              stroke,
              lineWidth: 5,
              strokeOpacity: 0.2,
            };
          },
          edgeStateStyles: {
            hover: {
              strokeOpacity: 1,
            },
          },
        },
        markerCfg: (cfg) => {
          const { edges } = data;
          return {
            position: "right",
            show: edges.find((item) => item.source === cfg.id),
            collapsed: !edges.find((item) => item.source === cfg.id),
          };
        },
        behaviors: ["drag-canvas", "zoom-canvas", "drag-node"],
        style: {
          height: "calc(100vh - 260px)",
          width: "calc(100vw - 240px)",
        },
      }}
    />
  );
};

export default MindMapGraph;

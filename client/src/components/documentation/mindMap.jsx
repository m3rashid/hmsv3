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
        value: {
          title: "0. Patient Enters",
          items: [{ text: "Goes to Reception" }],
        },
      },
      {
        id: "1",
        value: {
          title: "1. Reception",
          items: [{ text: "Patient's Query" }],
        },
      },
      {
        id: "2",
        value: {
          title: "2. Co Admin",
          items: [{ text: "Register patient" }],
        },
      },
      {
        id: "3",
        value: {
          title: "3. Doctor Not Available",
          items: [{ text: "Reschedule for future" }],
        },
      },
      {
        id: "4",
        value: {
          title: "4. Doctor",
          items: [{ text: "Diagnose the Patient" }],
        },
      },
      {
        id: "5",
        value: {
          title: "5. Receptionist",
          items: [{ text: "Create Appointment" }],
        },
      },
      {
        id: "6",
        value: {
          title: "6. Pharmacist",
          items: [
            { text: "Dispense Medicines" },
            { text: "Discard Custom Medicines" },
            { text: "Generate Receipt" },
          ],
        },
      },
      {
        id: "8",
        value: {
          title: "8. Exit",
          items: [{ text: "Patient exits" }],
        },
      },
    ],
    edges: [
      { source: "0", target: "1", value: "Registered" },
      { source: "0", target: "2", value: "Not Registered" },
      { source: "2", target: "1" },
      { source: "1", target: "3", value: "Unavailable" },
      { source: "3", target: "8" },
      { source: "1", target: "4", value: "Has Appointment" },
      { source: "1", target: "5", value: "No Appointment" },
      { source: "5", target: "4" },
      { source: "4", target: "6", value: "Meds Available" },
      { source: "4", target: "7", value: "Meds Unavailable" },
      { source: "6", target: "8" },
    ],
  };

  return (
    <FlowAnalysisGraph
      {...{
        data,
        nodeCfg: {
          size: [160, 30],
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

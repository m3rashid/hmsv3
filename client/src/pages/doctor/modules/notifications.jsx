import React from "react";
import { faker } from "@faker-js/faker";

const GenerateData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      patient: faker.name.findName(),
      disease: faker.lorem.sentence(),
      time: faker.date.past().toDateString(),
    });
  }
  return data;
};

const Notifications = () => {
  const data = GenerateData(10);

  return (
    <div
      style={{
        gridGap: "15px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      }}
    >
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: "#077842",
              borderRadius: "5px",
              padding: "20px",
              color: "white",
            }}
          >
            <div>
              <b>Patient : &nbsp; </b> {item.patient}
            </div>
            <div>
              <b>Time : &nbsp; </b> {item.time}
            </div>
            <div>
              <b>Disease : &nbsp; </b>
              {item.disease}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;

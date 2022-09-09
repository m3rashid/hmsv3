import React from "react";
import { Card } from "antd";

import { developers, professors } from "./data";
import ShowEntry from "../../components/common/showEntry";

const Profile = ({ data }) => {
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={<img alt={data.name} src={data.image} />}
    >
      <Card.Meta title={data.name} description={data.department} />
      {data.batch && <ShowEntry label="Batch" value={data.batch} />}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {data.github && <a href={data.github}>Github</a>}
        {data.linkedin && <a href={data.linkedin}>Linkedin</a>}
        {data.portfolio && <a href={data.portfolio}>Portfolio</a>}
      </div>
    </Card>
  );
};

const centerAll = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const About = () => {
  return (
    <>
      <h3 align="center">Project under the guidance of</h3>
      <br />
      <div style={centerAll}>
        {professors.map((prof) => (
          <Profile key={prof.name} data={prof} />
        ))}
      </div>

      <br />
      <br />
      <br />

      <h3 align="center">Developers in the project</h3>
      <br />
      <div style={centerAll}>
        {developers.map((dev) => (
          <Profile key={dev.name} data={dev} />
        ))}
      </div>
      <br />
    </>
  );
};

export default About;

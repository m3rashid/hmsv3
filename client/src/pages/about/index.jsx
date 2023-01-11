import { Card } from "antd";

import ShowEntry from "components/common/showEntry";
import { developers, professors } from "pages/about/data";

const Profile = ({ data }) => {
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          alt={data.name}
          src={data.image}
          style={{
            height: 300,
            objectFit: "cover",
          }}
        />
      }
    >
      <Card.Meta title={data.name} description={data.department} />
      {data.batch && <ShowEntry label="Batch" value={data.batch} />}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        {data.github && (
          <a target="_blank" rel="noreferrer" href={data.github}>
            Github
          </a>
        )}
        {data.linkedin && (
          <a target="_blank" rel="noreferrer" href={data.linkedin}>
            Linkedin
          </a>
        )}
        {data.portfolio && (
          <a target="_blank" rel="noreferrer" href={data.portfolio}>
            Portfolio
          </a>
        )}
      </div>
    </Card>
  );
};

const centerAll = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  maxWidth: 700,
  margin: "0 auto",
  gap: 20,
};

const About = () => {
  return (
    <>
      <h2 align="center">Project under the guidance of</h2>
      <br />
      <div style={centerAll}>
        {professors.map((prof) => (
          <Profile key={prof.name} data={prof} />
        ))}
      </div>

      <br />
      <br />
      <br />

      <h2 align="center">Developers in the project</h2>
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

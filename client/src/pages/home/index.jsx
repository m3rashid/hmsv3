import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const data = [
  { title: "Reception", image: "/images/reception.jpg", link: "/reception" },
  { title: "Doctor", image: "/images/doctor.jpg", link: "/doctor" },
  { title: "Pharmacy", image: "/images/pharmacy.jpg", link: "/pharmacy" },
  { title: "Admin", image: "/images/admin.jpeg", link: "/admin/home" },
];

const Home = () => {
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <img
        src="/images/center.jpg"
        alt="hospital"
        style={{ width: "100%", maxHeight: "300px" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "15px",
          margin: "50px 0",
        }}
      >
        {data.map((entry) => {
          const { title, image, link } = entry;
          return (
            <div key={`home ${link}`} style={{ maxWidth: 240 }}>
              <Link to={link}>
                <Card
                  hoverable
                  style={{ width: "100%", borderRadius: "5px" }}
                  cover={<img alt={`route to ${title}`} src={image} />}
                >
                  <Card.Meta title={title} />
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

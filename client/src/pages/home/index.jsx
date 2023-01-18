import { Typography } from "antd";
import { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <img
        src="/images/center.jpg"
        alt="hospital"
        style={{ maxHeight: "300px", margin: -20, width: "calc(100% + 40px)" }}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "100%", maxWidth: "200px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Mukhtar_Ahmed_Ansari_1980_stamp_of_India.jpg"
              alt="Mukhtar ahmad ansari"
            />
          </div>
          <div style={{ flex: 1, width: "100%", maxWidth: "500px" }}>
            <Typography.Title style={{ textAlign: "center" }}>
              Mukhtar Ahmed Ansari
            </Typography.Title>
            <p>
              Mukhtar Ahmed Ansari &#40;25 December 1880 &#45; 10 May 1936&#41;
              was an Indian nationalist and political leader, and former
              president of the Indian National Congress and the Muslim League
              during the Indian Independence Movement. One of the founders of
              the Jamia Millia Islamia University he remained its chancellor
              1928 to 1936.
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

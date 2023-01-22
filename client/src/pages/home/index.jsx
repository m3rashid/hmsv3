import { Carousel, Typography } from "antd";
import { configState } from "atoms/config";
import { Fragment } from "react";
import { useRecoilValue } from "recoil";

const Home = () => {
  const config = useRecoilValue(configState);

  return (
    <Fragment>
      <Carousel
        autoplay
        autoplaySpeed={2000}
        style={{
          maxHeight: "350px",
          margin: -20,
          width: "calc(100% + 40px)",
          overflow: "hidden",
        }}
      >
        {config.homepage_contents.carousel.map((image, index) => {
          return (
            <img
              key={`${image}-${index}`}
              src={image}
              alt="hospital"
              style={{ width: "100%", height: "100%" }}
            />
          );
        })}
      </Carousel>

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
          {config.homepage_contents.people.map((person, index) => {
            return (
              <Fragment key={index}>
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
                    src={person.image}
                    alt="Mukhtar ahmad ansari"
                  />
                </div>

                <div style={{ flex: 1, width: "100%", maxWidth: "500px" }}>
                  <Typography.Title style={{ textAlign: "center" }}>
                    {person.name}
                  </Typography.Title>
                  <p>{person.description}</p>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

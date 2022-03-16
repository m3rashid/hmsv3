import React from "react";
import Header from "../../components/Header";

const Home = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    online: online,
  };
  return (
    <>
      <Header title="Home" subTitle="" user={user} />
    </>
  );
};

export default Home;

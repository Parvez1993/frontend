import React from "react";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div>This is the Home Page</div>
    </>
  );
}

export default Home;

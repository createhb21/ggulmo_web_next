import { ReactElement } from "react";
import type { NextLayoutPage } from "next";

const Home: NextLayoutPage = () => {
  return <div />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <div>{page}</div>;
};

export default Home;

import Banner from "./banner/Banner";
import { Carousal } from "../../components";

const Home = () => {
  const trendingInfo = {
    tabs: ["Day", "Week"],
    endPoints: ["day", "week"],
  };
  trendingInfo.urls = trendingInfo.endPoints.map(
    (endPoint) => `/trending/movie/${endPoint.toLowerCase()}`
  );

  const popularInfo = {
    tabs: ["Movies", "TV Shows"],
    endPoints: ["movie", "tv"],
  };
  popularInfo.urls = popularInfo.endPoints.map(
    (endPoint) => `/${endPoint.toLowerCase()}/popular`
  );

  const topratedInfo = {
    tabs: ["Movies", "TV Shows"],
    endPoints: ["movie", "tv"],
  };
  topratedInfo.urls = topratedInfo.endPoints.map(
    (endPoint) => `/${endPoint.toLowerCase()}/top_rated`
  );

  return (
    <div className="home">
      <Banner />
      <Carousal header={"Trending"} info={trendingInfo} />
      <Carousal header={"What's Popular"} info={popularInfo} />
      <Carousal header={"Top Rated"} info={topratedInfo} />
    </div>
  );
};

export default Home;

import { useState, useEffect, useRef } from "react";
import "./banner.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks";
import { BackgroundImage } from "../../../components";

const Banner = () => {
  const { baseUrl } = useSelector((state) => state.home);

  const navigate = useNavigate();

  const [background, setBackground] = useState();

  const inputRef = useRef();

  const { data } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      baseUrl + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const handleSearch = () => {
    if (inputRef.current.value !== "") {
      console.log("search");
      navigate(`/search/${inputRef.current.value}`);
    }
  };

  return (
    <div className="banner">
      {background && <BackgroundImage src={background} theme="light" />}

      <div className="bannerContent">
        <h1 className="title">Welcome.</h1>
        <h2 className="subTitle">
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search for a movie or tv show..."
            ref={inputRef}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

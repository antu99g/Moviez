import { useEffect, useState } from "react";
import "./searchModal.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../../api";
import PosterFallback from "../../assets/no-poster.png";
import { HiOutlineSearch } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import dayjs from "dayjs";

const SearchModal = ({ toggleSearchModal }) => {
  const navigate = useNavigate();

  const { baseUrl } = useSelector((state) => state.home);

  const [data, setData] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword !== "") {
      fetchDataFromApi(`/search/multi?query=${keyword}&page=1`).then((res) => {
        const requiredData =
          res.results.length > 7 ? res.results.splice(0, 7) : res.results;
        setData(requiredData);
      });
    } else {
      setData([]);
    }
  }, [keyword]);

  const handleSearchInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (event) => {
    if (keyword !== "") {
      if (
        event.type === "click" ||
        (event.type === "keyup" && event.key === "Enter")
      ) {
        toggleSearchModal(false);
        navigate(`/search/${keyword}`);
      }
    }
  };

  const formatRating = (rating) => {
    const formattedRating = parseFloat(rating.toFixed(1));
    const finalRating =
      formattedRating % 1 === 0 ? formattedRating.toFixed() : formattedRating;
    return finalRating;
  };

  return (
    <div className="searchModal">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search for a movie or tv show..."
          onChange={handleSearchInput}
          onKeyUp={handleSearch}
        />
        <HiOutlineSearch onClick={handleSearch} />
        <MdClose onClick={toggleSearchModal} />
      </div>

      {data.length > 0 && (
        <div className="searchSuggestion">
          {data.map((item, index) => {
            const posterUrl = item.poster_path
              ? baseUrl + item.poster_path
              : PosterFallback;
            return (
              <Link
                to={`/${item.media_type}/${item.id}`}
                onClick={() => toggleSearchModal(false)}
                key={index}
              >
                <div className="resultItem">
                  <img
                    src={posterUrl}
                    alt={item.title || item.name}
                    loading="lazy"
                  />

                  <span className="resultContent">
                    <h4>{item.title || item.name}</h4>
                    <div className="resultInfo">
                      <FaStar />
                      <span className="rating">
                        {formatRating(item.vote_average)}
                      </span>
                      <span className="date">
                        {dayjs(item.release_date).format("MMM DD, YY")}
                      </span>
                    </div>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchModal;

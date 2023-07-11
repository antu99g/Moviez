import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./cardItem.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import Rating from "../rating/Rating";
import PosterFallback from "../../assets/no-poster.png";

const CardItem = ({ item, endPoint, cardSize }) => {
  const { baseUrl } = useSelector((state) => state.home);

  const posterUrl = item.poster_path
    ? baseUrl + item.poster_path
    : PosterFallback;

  return (
    <span className={`cardItem ${cardSize}`}>
      <Link to={`/${item.media_type || endPoint}/${item.id}`}>
        <div className="imageContainer">
          <LazyLoadImage
            src={posterUrl}
            alt={item.title || item.name}
            effect="blur"
          />
          <div className="ratingContainer">
            <Rating rating={item.vote_average} />
          </div>
        </div>
      </Link>

      <h5>{item.title || item.name}</h5>

      <span className="date">
        {dayjs(item.release_date).format("MMM DD, YY")}
      </span>
    </span>
  );
};

export default CardItem;

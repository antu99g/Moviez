import { LazyLoadImage } from "react-lazy-load-image-component";
import "./cast.scss";
import { useSelector } from "react-redux";
import ProfileImg from "../../../assets/avatar.png";

const Cast = ({ cast }) => {
  const { baseUrl } = useSelector((state) => state.home);

  const imageUrl = cast.profile_path ? baseUrl + cast.profile_path : ProfileImg;
  return (
    <div className="castCard">
      <LazyLoadImage src={imageUrl} effect="blur" />
      <h3>{cast.original_name}</h3>
      <p>{cast.character}</p>
    </div>
  );
};

export default Cast;

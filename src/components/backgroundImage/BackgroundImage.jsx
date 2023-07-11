import { LazyLoadImage } from "react-lazy-load-image-component";
import "./background.scss";

const BackgroundImage = ({ src, alt, theme }) => {
  return (
    <div className={`background ${theme ? theme : ""}`}>
      {src && <LazyLoadImage src={src} alt={alt ? alt : ""} effect="blur" />}
    </div>
  );
};

export default BackgroundImage;

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./rating.scss";

const Rating = ({ rating }) => {
  const formattedRating = parseFloat(rating.toFixed(1));
  const finalRating =
    formattedRating % 1 === 0 ? formattedRating.toFixed() : formattedRating;

  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={finalRating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default Rating;

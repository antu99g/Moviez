import "./banner.scss";
import { Rating } from "../../../components";
import dayjs from "dayjs";
import { BsPlayCircle } from "react-icons/bs";

const BannerContent = ({
  data,
  crew,
  creditsLoading,
  trailerId,
  openVideoModal,
}) => {
  const director = crew?.filter((member) => member.job === "Director");

  const writer = crew?.filter(
    (member) =>
      member.job === "Writer" ||
      member.job === "Story" ||
      member.job === "Screenplay"
  );

  const formattedRuntime = () => {
    const totalMinutes = data.runtime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
  };

  return (
    <div className="bannerContent">
      <h1>
        {`${data?.title || data?.name} (${dayjs(data?.release_date).format(
          "YYYY"
        )})`}
      </h1>

      <h3>{data?.tagline}</h3>

      <ul className="genreContainer">
        {data?.genres.map((genre) => {
          return <li key={genre.id}>{genre.name}</li>;
        })}
      </ul>

      <div className="iconRow">
        <div className="ratingContent">
          <Rating rating={data.vote_average} />
        </div>
        <div className="playBtn" onClick={() => openVideoModal(trailerId)}>
          <BsPlayCircle />
          <span>Watch Trailer</span>
        </div>
      </div>

      <h2 className="overviewHeader">Overview</h2>
      <p className="overview">{data?.overview}</p>

      <div className="inlineContent inlineInfo">
        <div>
          <h4 className="infoHeader">Status:</h4>
          <span className="infoData">{data?.status}</span>
        </div>
        <div>
          <h4 className="infoHeader">Release Date:</h4>
          <span className="infoData">
            {dayjs(data.release_date).format("MMM DD, YYYY")}
          </span>
        </div>
        {data?.runtime && (
          <div>
            <h4 className="infoHeader">Runtime:</h4>
            <span className="infoData">{formattedRuntime()}</span>
          </div>
        )}
      </div>

      {!creditsLoading && (
        <>
          {director && director.length > 0 && (
            <div className="inlineInfo">
              <h4 className="infoHeader">Director:</h4>
              <span className="crewInfo">
                {director.map((d, index) => (
                  <span
                    className="infoData"
                    style={{ marginRight: 5 }}
                    key={index}
                  >
                    {d.name}
                    {director.length - 1 !== index && ", "}
                  </span>
                ))}
              </span>
            </div>
          )}

          {writer && writer.length > 0 && (
            <div className="inlineInfo">
              <h4 className="infoHeader">Writer:</h4>
              <span className="crewInfo">
                {writer.map((d, index) => (
                  <span
                    className="infoData"
                    style={{ marginRight: 5 }}
                    key={index}
                  >
                    {d.name}
                    {writer.length - 1 !== index && ", "}
                  </span>
                ))}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BannerContent;

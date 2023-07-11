import "./videoSection.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsPlayCircle } from "react-icons/bs";

const VideosSection = ({ videos, openVideoModal }) => {
  return (
    <div className="videoSection">
      <h2 className="videoHeader">Official Videos</h2>
      <div className="videoContainer">
        {videos.map((video) => {
          return (
            <div className="videoCard" key={video.id}>
              <div
                className="videoBanner"
                onClick={() => openVideoModal(video.key)}
              >
                <LazyLoadImage
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  className="thumbnail"
                />
                <BsPlayCircle />
              </div>

              <span className="videoTitle">{video.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideosSection;

import "./videoModal.scss";
import ReactPlayer from "react-player/youtube";
import { MdClose } from "react-icons/md";

const VideoModal = ({ videoId, isModalOpen, closeVideoModal }) => {
  return (
    <div className={`videoModal ${isModalOpen ? "visible" : ""}`}>
      <div className="videoPlayer">
        <div className="closeBtn" onClick={closeVideoModal}>
          <MdClose />
          <span>Close</span>
        </div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          className="screen"
        />
      </div>
    </div>
  );
};

export default VideoModal;

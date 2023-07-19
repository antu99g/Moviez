import "./details.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks";
import { BackgroundImage, Carousal } from "../../components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BannerContent from "./bannerContent/BannerContent";
import Cast from "./cast/Cast";
import VideoSection from "./VideoSection/VideoSection";
import { useState } from "react";
import { VideoModal } from "../../components";
import ImageSkeleton from "./skeletons/imageSkeleton/ImageSkeleton";
import BannerSkeleton from "./skeletons/bannerSkeleton/BannerSkeleton";
import CastSkeleton from "./skeletons/castSkeleton/CastSkeleton";

const Details = () => {
  const { mediaType, id } = useParams();

  const { baseUrl } = useSelector((state) => state.home);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [videoId, setVideoId] = useState(null);

  const openVideoModal = (id) => {
    setVideoId(id);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setVideoId(null);
  };

  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  const { data: videos, loading: loadingVideo } = useFetch(
    `/${mediaType}/${id}/videos`
  );

  const similarInfo = {
    endPoints: [mediaType],
    urls: [`/${mediaType}/${id}/similar`],
  };

  const recommendedInfo = {
    endPoints: [mediaType],
    urls: [`/${mediaType}/${id}/recommendations`],
  };

  return (
    <div className="details">
      <div className="contentContainer">
        {!loading && (
          <BackgroundImage
            src={baseUrl + data?.poster_path}
            alt={data.title}
            theme="dark"
          />
        )}

        {loading ? (
          <ImageSkeleton />
        ) : (
          <LazyLoadImage
            src={baseUrl + data?.poster_path}
            alt={data?.title || data?.name}
            effect="blur"
            className="imageContent"
          />
        )}

        {loading || creditsLoading ? (
          <BannerSkeleton />
        ) : (
          <BannerContent
            data={data}
            crew={credits?.crew}
            creditsLoading={creditsLoading}
            trailerId={videos?.results?.[0]?.key}
            openVideoModal={openVideoModal}
          />
        )}
      </div>

      {creditsLoading ? (
        <>
          <h2 className="castHeader">Top Cast</h2>
          <CastSkeleton />
        </>
      ) : (
        credits?.cast?.length > 0 && (
          <>
            <h2 className="castHeader">Top Cast</h2>
            <div className="castContainer">
              {credits.cast.map((member, index) => {
                return <Cast cast={member} key={member.cast_id || index} />;
              })}
            </div>
          </>
        )
      )}

      {!loadingVideo && videos.results.length > 0 && (
        <VideoSection videos={videos.results} openVideoModal={openVideoModal} />
      )}

      <Carousal header="Similar Movies" info={similarInfo} />

      <Carousal header="Recommendations" info={recommendedInfo} />

      {isModalOpen && (
        <VideoModal
          isModalOpen={isModalOpen}
          videoId={videoId}
          closeVideoModal={closeVideoModal}
        />
      )}
    </div>
  );
};

export default Details;

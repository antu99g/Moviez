import "./contentSkeleton.scss";

const ContentSkeleton = ({ header }) => {
  const skeletonItems = new Array(8);
  return (
    <>
      <h1 className="skeletonHeader">{header}</h1>

      <div className="contentSkeletonContainer">
        {[...skeletonItems].map((_, index) => {
          return (
            <div className="contentSkeletonItem" key={index}>
              <div className="contentPosterBlock skeleton" />
              <div className="title skeleton" />
              <div className="date skeleton" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ContentSkeleton;

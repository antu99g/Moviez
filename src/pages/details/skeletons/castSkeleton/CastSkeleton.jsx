import "./castSkeleton.scss";

const CastSkeleton = () => {
  const emptyArray = Array(7);
  return (
    <div className="castSkeleton">
      {[...emptyArray].map((_, index) => {
        return (
          <div className="castItemSkeleton" key={index}>
            <div className="profileSkeleton skeleton" />
            <div className="skeletonRow skeleton" />
            <div className="skeletonRow skeleton" />
          </div>
        );
      })}
    </div>
  );
};

export default CastSkeleton;

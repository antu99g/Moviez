import "./bannerSkeleton.scss";

const BannerSkeleton = () => {
  return (
    <div className="bannerSkeletonContainer">
      <div className="skeletonRow skeleton" />
      <div className="skeletonRow skeleton" style={{ width: "80%" }} />
      <div className="iconRowSkeleton">
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
      <div
        className="skeletonRow skeleton"
        style={{ width: "30%", marginBottom: 12 }}
      />
      <div className="skeletonRow skeleton" />
      <div className="skeletonRow skeleton" />
      <div className="skeletonRow skeleton" />
      <div className="skeletonRow skeleton" />
      <div
        className="skeletonRow skeleton"
        style={{ width: "75%", marginTop: 30 }}
      />
      <div className="skeletonRow skeleton" style={{ width: "75%" }} />
    </div>
  );
};

export default BannerSkeleton;

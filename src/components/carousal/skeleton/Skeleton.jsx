import "./skeleton.scss";

const Skeleton = () => {
  const skeletonItems = new Array(5);
  return (
    <div className="skeletonContainer">
      {[...skeletonItems].map((_, index) => {
        return (
          <div className="skeletonItem" key={index}>
            <div className="posterBlock skeleton" />
            <div className="title skeleton" />
            <div className="date skeleton" />
          </div>
        );
      })}
    </div>
  );
};

export default Skeleton;

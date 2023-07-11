import "./skeleton.scss";

const Skeleton = () => {
  const skeletonItems = new Array(5);
  return (
    <div className="skeletonContainer">
      {skeletonItems.map((key, index) => {
        return (
          <div className="skeletonItem" key={index}>
            <div className="posterBlock" />
            <div className="textBlock">
              <div className="title skeleton" />
              <div className="date skeleton" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Skeleton;

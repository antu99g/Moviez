import { useRef, useState } from "react";
import "./carousal.scss";
import { useFetch } from "../../hooks";
import Tabs from "./tabs/Tabs";
import Skeleton from "./skeleton/Skeleton";
import CardItem from "../cardItem/CardItem";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Carousal = ({ header, info }) => {
  const [activeTab, setActiveTab] = useState(0);

  const { data, loading } = useFetch(info.urls[activeTab]);

  const containerRef = useRef();

  const handleCTabChange = (index) => {
    setActiveTab(index);
  };

  const slideTo = (dir) => {
    const container = containerRef.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="list">
      {data?.results.length > 0 && (
        <>
          <div className="listHeader">
            <h3>{header}</h3>
            {info?.tabs?.length > 0 && (
              <Tabs tabs={info.tabs} handleTabChange={handleCTabChange} />
            )}
          </div>

          <BsFillArrowLeftCircleFill
            className="carouselLeftNav arrow"
            onClick={() => slideTo("left")}
          />
          <BsFillArrowRightCircleFill
            className="carouselRightNav arrow"
            onClick={() => slideTo("right")}
          />

          {loading ? (
            <Skeleton />
          ) : (
            <div className="listItemContainer" ref={containerRef}>
              {data?.results.map((item, index) => {
                return (
                  <CardItem
                    item={item}
                    endPoint={info.endPoints[activeTab]}
                    cardSize="small"
                    key={index}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Carousal;

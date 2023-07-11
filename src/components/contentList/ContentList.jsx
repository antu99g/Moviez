import "./contentList.scss";
import { CardItem } from "../../components";
import { BiLoaderAlt } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";

const ContentList = ({ data, pageNum, fetchNextPage }) => {
  return (
    <InfiniteScroll
      className="content"
      dataLength={data?.results?.length || []}
      next={fetchNextPage}
      hasMore={pageNum < data?.total_pages}
      loader={<BiLoaderAlt />}
    >
      {data?.results.map((item, index) => {
        if (item.media_type === "person") return;
        return (
          <CardItem
            item={item}
            endPoint={item.media_type}
            cardSize="large"
            key={index}
          />
        );
      })}
    </InfiniteScroll>
  );
};

export default ContentList;

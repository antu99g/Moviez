import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./explore.scss";
import { fetchDataFromApi } from "../../api";
import { ContentList } from "../../components";
import { BiLoaderAlt } from "react-icons/bi";

const Explore = () => {
  const { mediaType } = useParams();

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPageData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`).then((res) => {
      setData((prevData) => {
        if (prevData && prevData.results) {
          return {
            ...prevData,
            results: [...prevData.results, ...res.results],
          };
        } else {
          return res;
        }
      });

      setLoading(false);
    });
  };

  const fetchNextPage = () => {
    setPageNum((prev) => prev + 1);
  };

  useEffect(() => {
    setData(() => null);
    setPageNum(() => 1);
    fetchPageData();
  }, [mediaType]);

  useEffect(() => {
    fetchPageData();
  }, [pageNum]);

  return (
    <div className="exploreContainer">
      {data?.results?.length > 0 ? (
        <>
          <h1 className="pageTitle">
            {`Explore ${mediaType === "tv" ? "TV Shows" : "Movies"}`}
          </h1>

          <ContentList
            data={data}
            pageNum={pageNum}
            fetchNextPage={fetchNextPage}
          />
        </>
      ) : (
        !loading && (
          <div className="resultNotFound">Sorry, No results found!</div>
        )
      )}
      {loading && <BiLoaderAlt className="loader" />}
    </div>
  );
};

export default Explore;

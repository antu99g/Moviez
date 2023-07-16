import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./search.scss";
import { fetchDataFromApi } from "../../api";
import { ContentList, ContentSkeleton } from "../../components";
import { BiLoaderAlt } from "react-icons/bi";

const SearchResult = () => {
  const { query } = useParams();

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPageData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
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
      }
    );
  };

  const fetchNextPage = () => {
    setPageNum((prev) => prev + 1);
  };

  useEffect(() => {
    setData(() => null);
    setPageNum(() => 1);
    fetchPageData();
  }, [query]);

  useEffect(() => {
    fetchPageData();
  }, [pageNum]);

  return (
    <div className="searchResultContainer">
      {pageNum === 1 && loading ? (
        <ContentSkeleton header="Search Results" />
      ) : data?.results?.length > 0 ? (
        <>
          <h1 className="pageTitle">
            <span>{`Search ${
              data?.total_results > 1 ? "results" : "result"
            } of `}</span>
            <span className="queryHeader">{`'${query}'`}</span>
          </h1>

          <ContentList
            data={data}
            pageNum={pageNum}
            fetchNextPage={fetchNextPage}
          />
        </>
      ) : (
        <div className="resultNotFound">No results found!</div>
      )}

      {loading && pageNum !== 1 && <BiLoaderAlt className="loader" />}
    </div>
  );
};

export default SearchResult;

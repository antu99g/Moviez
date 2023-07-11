import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../api";

export const useFetch = (baseUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(false);

    fetchDataFromApi(baseUrl)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [baseUrl]);

  return {
    data,
    loading: loading ? "Loading..." : false,
    error: error ? "Something went wrong!" : false,
  };
};

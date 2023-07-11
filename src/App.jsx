import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./api";
import { useDispatch } from "react-redux";
import { setBaseUrl } from "./store/slices/homeSlice";
import { Home, Details, Explore, SearchResult, Error } from "./pages";
import { Footer, Header } from "./components";
import "./index.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const baseUrl = res.images.secure_base_url + "original";
      dispatch(setBaseUrl(baseUrl));
    });
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineSearch, HiHome } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { SlMenu } from "react-icons/sl";

const Header = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSearchModal = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  const handleSearchInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (event) => {
    if (
      event.type === "click" ||
      (event.type === "keyup" && event.key === "Enter")
    ) {
      setIsSearchOpen(false);
      navigate(`/search/${keyword}`);
    }
  };

  return (
    <header className={`header ${isMobileMenuOpen ? "mobileHeader" : ""}`}>
      <h1 className="logo" onClick={() => navigate("/")}>
        <img src={"movix-logo.png"} alt="" />
        Moviez
      </h1>

      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/explore/movie">Movies</Link>
        </li>
        <li>
          <Link to="/explore/tv">TV Shows</Link>
        </li>
        <li>
          <HiOutlineSearch onClick={toggleSearchModal} />
        </li>
      </ul>

      <div className="mobileMenu">
        <Link to="/">
          <HiHome />
        </Link>

        <HiOutlineSearch onClick={toggleSearchModal} />

        {isMobileMenuOpen ? (
          <>
            <MdClose onClick={closeMobileMenu} />
            <ul className="mobileMenuItems">
              <li onClick={() => navigate("/explore/movie")}>Movies</li>
              <li onClick={() => navigate("/explore/tv")}>TV Shows</li>
            </ul>
          </>
        ) : (
          <SlMenu onClick={openMobileMenu} />
        )}
      </div>

      {isSearchOpen && (
        <div className="searchModal">
          <input
            type="text"
            placeholder="Search for a movie or tv show..."
            onChange={handleSearchInput}
            onKeyUp={handleSearch}
          />
          <HiOutlineSearch onClick={handleSearch} />
          <MdClose onClick={toggleSearchModal} />
        </div>
      )}
    </header>
  );
};

export default Header;

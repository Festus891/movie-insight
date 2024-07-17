import { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

const Header = () => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      });
    };
  }, []);
  return (
    <div className={`header ${show && "nav_black"}`}>
      <Link className="logo" to="/" onClick={() => window.scroll(0, 0)}>
        <h2>Movie</h2>
        <img src={`${process.env.PUBLIC_URL}/insight.png`} alt="Insight" />
        <h2>Insight</h2>
      </Link>

      <Link to="/search" className="search">
        <SearchIcon />
      </Link>
    </div>
  );
};

export default Header;

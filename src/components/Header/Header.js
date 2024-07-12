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
    // <span onClick={() => window.scroll(0, 0)} className="header">
    //   🎬 Movie Insight 🎥
    // </span>
    <div className={`header ${show && "nav_black"}`}>
      <Link className="logo" to="/" onClick={() => window.scroll(0, 0)}>
        <h4>Movie</h4>
        <img src={`${process.env.PUBLIC_URL}/insight.png`} alt="Insight" />
        <h4>Insight</h4>
      </Link>

      <Link to="/search" className="search">
        <SearchIcon />
      </Link>
    </div>
  );
};

export default Header;

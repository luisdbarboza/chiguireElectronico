import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  SidebarContext,
} from "../context/SidebarContext";
import Drawer from "./Drawer";
import { SERVER_ADDRESS } from "../utils";

const MenuButton = () => {
  const { dispatchSidebar } = useContext(SidebarContext);

  return (
    <div
      className="navbar-menu-button"
      onClick={() => {
        dispatchSidebar({ type: "SHOW_HIDE" });
      }}
    >
      <h2>Menu</h2>
      <img loading="lazy" src="/images/icons/menu-24px.svg" alt="menu button" />
    </div>
  );
};

const NavBarTop = () => {
  const history = useHistory();

  return (
    <>
      {/*PARTE BLANCA DE LA BARRA DE NAVEGACION*/}
      <div className="nav-top">
        <div className="nav-left">
          <img
            loading="lazy"
            src="/images/logo.png"
            alt="page logo"
            className="logo"
            onClick={() => {
              history.push("/");
            }}
          />
        </div>
        <div className="nav-right">
          <MenuButton />
        </div>
      </div>
    </>
  );
};

const NavbarBottom = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `${SERVER_ADDRESS}/categories?limit=4&onlyField=name`;
      const promiseResponse = await fetch(url);
      const responseData = await promiseResponse.json();

      if(responseData.ok) {
        setCategories(responseData.categories);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <div className="nav-bottom">
        {/*PARTE AZUL DE LA BARRA DE NAVEGACION*/}
        <ul className="navbar-sections">
          {categories.map((category, index) => {
            return (
              <Link key={index} to={`/category/${category._id}`}>
                {category.name}
              </Link>
            );
          })}
        </ul>
        <div className="social-media-buttons">
          <div className="social-media-button-img">
            <img
              loading="lazy"
              src="/images/icons/facebook_white.svg"
              alt="facebook button"
            />
          </div>
          <div className="social-media-button-img">
            <img
              loading="lazy"
              src="/images/icons/telegram_white.svg"
              alt="telegram button"
            />
          </div>
          <div className="social-media-button-img">
            <img
              loading="lazy"
              src="/images/icons/twitter_white.svg"
              alt="twitter button"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Navbar = React.memo(() => {
  return (
    <header>
      <nav>
        <NavBarTop />
        <NavbarBottom />
        <Drawer />
      </nav>
    </header>
  );
});

export default Navbar;

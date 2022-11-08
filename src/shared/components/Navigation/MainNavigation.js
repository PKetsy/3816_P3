import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
    // //need a component that will render as a background to the drawer
    // //so when clicked background, drawer is closed.  (BackDrop)
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        {/* props.children starts here */}
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Project 3: 3816</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
        {/* props.children ends here (mainHeader.js example) */}
      </MainHeader>
    </React.Fragment>
    //all of this will be forwarded to the special 'children' prop to Mainheader and will be outputted
    //in props.children
  );
};

export default MainNavigation;

//this file is apart of the header.  Header is the shell which provides styling
//this file will contain all of the different links on the SPA

// React.Fragment allows multiple nested elements / root elements

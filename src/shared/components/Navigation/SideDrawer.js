import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
//   a library that makes it easy to animate something if registered to the DOM

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      //   //show prop is found in MainNavigation.js
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;

// //added in animation so it slides in and out when clicked
//  and render it in different part of the page then where drawer would be included

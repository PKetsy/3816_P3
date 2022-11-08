import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

//actual modal overlay, what will be on the screen
const ModalOverlay = (props) => {
  //from template literal className, able to
  // now add custom classes to modal instead of restrictive classes
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
          {/* //props.children will be whatever added between opening/closing tag of modal */}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

//adding in backdrop and animation when modal opens / closes.
const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {/* if props.show(true) render backdrop */}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
        {/* ...props takes props passed to Modal(external component), and forwards them to ModalOverlay(internal component)
          allows footer, footer.class, header etc to be SET on exported modal component */}
        {/* it is called the spread operator - takes all KVP's of props object and spreads them as attributes to ModalOverlay */}
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;

// ${props.headerClass} ${props.contentClass} ${props.footerClass} allows external customization

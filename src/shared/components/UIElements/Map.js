import React, { useRef, useEffect } from "react";
//useRef is used to create 'references'.  Used for reference/pointer for DOM node
//  or used to create variables that survive re-render cycles of values and don't lose values

//useEffect registers logic, a function, that should be executed when certain inputs change.

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;
  //object destructuring ^^

  // useEffect(() => {function], [dependencies]})
  //whenever dependencies change ([]), the function{} will be re-executed

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    //now calling a new window to show markers on center of map
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
  //react setting up a magic connection between the div, and constant on line 8.
  //  and the constant holds a pointer to this div above.
};

export default Map;

//will be using google map SDK

//https://developers.google.com/maps/documentation/javascript/adding-a-google-map#javascript

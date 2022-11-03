import React from "react";

import UsersList from "../components/UsersList";

//this component will be fetching data from the backend, a stateful component.  not presentational
const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwartz",
      image: "https://m.media-amazon.com/images/I/418BFBVVATL._SY580_.jpg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;

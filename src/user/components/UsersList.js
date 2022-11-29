import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  // //output message of no users found || list of the users signed up already
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users found!!!</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {/* //map through vanilla JS objects into an array of JSX elements */}
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;

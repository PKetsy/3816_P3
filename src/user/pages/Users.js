import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

//this component will be fetching data from the backend, a stateful component.  not presentational
const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setLoadedUsers(responseData.users);
        //users-controllers file in backend will show what is returned from 'users' key
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  //error modal, with loaded state, with loaded users.
  //react-fragment used because multiple top level JSX elements are used
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      {/* //if we are not loading, and loaded users is true --> show users list with loaded users */}
    </React.Fragment>
  );
};

export default Users;

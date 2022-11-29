import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //switchMode Handler -- will be using useState because user will be switching modes, and state.
  const switchModeHandler = () => {
    //update behind the scenes form data when user switches Mode.  Multiple state changes will be present
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          //   copy all previous fields, and make name undefined for user to enter
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
    //invertly setting IsLoginMode from whatever was given originally.  'Take current prevMode and set it to opposite
  };

  //submit handler
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (isLoginMode) {
      try {
        //signup mode : don't just log in, but instead send an HTTP request.  Using Async to avoid promises / catch
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            //headers are for KVPs going to the outgoing request
            "Content-Type": "application/json",
          },
          //take an array and convert it to JSON
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            //^These^ will all be validated once they reach authSubmitHandler because button can't be clicked without a valid form
          }),
        });
        //parse the response body to get data
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
          //if this if statement ran, it will execute catch block
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    } else {
      try {
        //signup mode : don't just log in, but instead send an HTTP request.  Using Async to avoid promises / catch
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            //headers are for KVPs going to the outgoing request
            "Content-Type": "application/json",
          },
          //take an array and convert it to JSON
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            //^These^ will all be validated once they reach authSubmitHandler because button can't be clicked without a valid form
          }),
        });
        //parse the response body to get data
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
          //if this if statement ran, it will execute catch block
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {/* render new input if user is in SIGNUP mode */}
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid Password that is at least 5 characters."
            onInput={inputHandler}
          />
          {/* //button should be disabled if the form is not valid. */}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        {/* Switch Button will be implemented below */}
        <Button inverse onClick={switchModeHandler}>
          {" "}
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;

import React, { useCallback, useReducer, useState } from "react";
import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  Zocial,
} from "@expo/vector-icons";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signingUp } from "../utils/actions/authActions";
import { ActivityIndicator } from "react-native";
import colors from "../Constants/colors";
import LogIn from "../components/LogIn";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUp = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    try {
      setIsLoading(true);
      signingUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }

    return fetch("http://localhost:3333/api/1.0.0/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formState.inputValues.firstName,
        last_name: formState.inputValues.lastName,
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw "Failed validation";
        } else {
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        console.log("token: " + responseJson.token);
        AsyncStorage.setItem("token", responseJson.token);
        AsyncStorage.setItem("user_id", responseJson.user_id.toString());
        console.log("user created with ID: " + responseJson.user_id);
        props.navigation.navigate("LogIn");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Input
        id="firstName"
        label="First name"
        icon="user"
        iconSize={25}
        iconPack={SimpleLineIcons}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["firstName"]}
      />

      <Input
        id="lastName"
        label="Last name"
        icon="user"
        iconSize={25}
        iconPack={SimpleLineIcons}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["lastName"]}
      />

      <Input
        id="email"
        label="Email"
        icon="email-outline"
        iconSize={25}
        iconPack={MaterialCommunityIcons}
        onInputChanged={inputChangedHandler}
        KEYBOARDTYPE="email-address"
        autoCapitalize="none"
        errorText={formState.inputValidities["email"]}
      />

      <Input
        id="password"
        label="Password"
        icon="lock"
        autoCapitalize="none"
        secureTextEntry={true}
        iconSize={25}
        iconPack={SimpleLineIcons}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["password"]}
      />

      {isLoading ? (
        <ActivityIndicator size="small" color={colors.brown} />
      ) : (
        <SubmitButton
          title="Sign up!"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignUp;

import React, { useCallback, useReducer, useState } from "react";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { logginIn } from "../utils/actions/authActions";
import { ActivityIndicator } from "react-native";
import colors from "../Constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  inputValues: {
    email: "",
    password: "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const LogIn = (props) => {

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
      logginIn(formState.inputValues.email, formState.inputValues.password);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }

    return fetch("http://localhost:3333/api/1.0.0/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw "Failed validation, check email or password";
        } else {
          throw "Something went wrong";
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem("@session_token", responseJson.token);
        //props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="email-outline"
        iconSize={25}
        iconPack={MaterialCommunityIcons}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["email"]}
      />

      <Input
        id="password"
        label="Password"
        icon="lock"
        iconSize={25}
        iconPack={SimpleLineIcons}
        autoCapitalize="none"
        secureTextEntry={true}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["password"]}
      />
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.brown} />
      ) : (
        <SubmitButton
          title="Log in!"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default LogIn;

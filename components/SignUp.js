import React, { useCallback, useEffect, useReducer, useState } from "react";
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
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.auth);
  console.log(stateData);
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

  useEffect(() => {
    if (error) {
      Alert.alert("Error occured", error, [{ text: "Okay"}]);
    }
  }, [error])

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      const action = signingUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );
      dispatch(action);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

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
        value={formState.inputValues.email}
      />

      <Input
        id="lastName"
        label="Last name"
        icon="user"
        iconSize={25}
        iconPack={SimpleLineIcons}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["lastName"]}
        value={formState.inputValues.email}
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

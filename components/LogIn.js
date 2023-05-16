import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { logginIn } from "../utils/actions/authActions";
import { ActivityIndicator, Alert } from "react-native";
import colors from "../Constants/colors";
import { useDispatch, useSelector } from "react-redux";

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
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      const action = logginIn(
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
        id="email"
        label="Email"
        icon="email-outline"
        iconSize={25}
        iconPack={MaterialCommunityIcons}
        onInputChanged={inputChangedHandler}
        initialValue={formState.inputValidities.email}
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
        initialValue={formState.inputValidities}
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

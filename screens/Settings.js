import React, { useCallback, useReducer, useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import colors from "../Constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../utils/actions/loadActions";


const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  },
  formIsValid: false,
};

const Settings = (props) => {
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector(state => state.auth.userData)
    console.log("data: " + userData);

      const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
          const result = validateInput(inputId, inputValue);
          dispatchFormState({ inputId, validationResult: result, inputValue });
        },
        [dispatchFormState]
      );

    const loadUpUser = useCallback(async () => {
      try {
        setIsLoading(false); // set loading spinner

        const action = await loadUser();
        dispatch(action);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }, [dispatch, formState]);

  const updateHandler = () => {
    console.log("saved");
  }

  useEffect(() => {
    loadUpUser();
  }, [loadUpUser]);


  return (
    
    <PageContainer>
      <PageTitle text="Settings" />
      

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

      {isLoading ? (
        <ActivityIndicator size="small" color={colors.brown} />
      ) : (
        <SubmitButton
          title="Update!"
          onPress={updateHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Settings;

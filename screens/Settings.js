import React, { useCallback, useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import Input from "../components/Input";

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

const Settings = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );
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
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Settings;

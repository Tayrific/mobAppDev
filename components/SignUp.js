import React from "react";
import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  Zocial,
} from "@expo/vector-icons";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { validateInput } from '../utils/actions/formActions';


const SignUp = (props) => {
  const inputChangedHandler = (inputId, inputValue) => {
    console.log(validateInput(inputId, inputValue));
  }
  return (
    <>
      <Input
        id="firstName"
        label="First name"
        icon="user"
        iconSize={25}
        iconPack={SimpleLineIcons}
        onInputChanged={inputChangedHandler}
      />

      <Input
        id="lastName"
        label="Last name"
        icon="user"
        iconSize={25}
        iconPack={SimpleLineIcons}
        onInputChanged={inputChangedHandler}
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
      />

      <SubmitButton
        title="Sign up!"
        onPress={() => console.log("button pressed!")}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUp;

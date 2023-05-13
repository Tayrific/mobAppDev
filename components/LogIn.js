import React from "react";
import { SimpleLineIcons,MaterialCommunityIcons } from "@expo/vector-icons";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { validateInput } from '../utils/actions/formActions';

const LogIn = (props) => {

  const inputChangedHandler = (inputId, inputValue) => {
    console.log(validateInput(inputId, inputValue));
}


  
  return (
    <>
      <Input
        id = "email"
        label="Email"
        icon="email-outline"
        iconSize={25}
        iconPack={MaterialCommunityIcons}
        onInputChanged={inputChangedHandler}/>

      <Input
        id = "password"
        label="Password"
        icon="lock"
        iconPack={SimpleLineIcons}
        autoCapitalize="none"
        secureTextEntry={true}
        onInputChanged={inputChangedHandler}/>

      <SubmitButton
        title="Log in!"
        onPress={() => console.log("button pressed!")}
        style={{ marginTop: 20 }}/>
    </>
  );
};

export default LogIn;

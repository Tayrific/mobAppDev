import React from "react";
import { SimpleLineIcons,MaterialCommunityIcons } from "@expo/vector-icons";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";

const LogIn = (props) => {
  return (
    <>
      <Input
        label="Email"
        icon="email-outline"
        iconSize={25}
        iconPack={MaterialCommunityIcons}
      />

      <Input
        label="Password"
        icon="lock"
        iconSize={25}
        iconPack={SimpleLineIcons}
      />

      <SubmitButton
        title="Log in!"
        onPress={() => console.log("button pressed!")}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default LogIn;

import React from "react";
import {
    SimpleLineIcons,
    MaterialCommunityIcons,
    Zocial,
  } from "@expo/vector-icons";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";

const SignUp = (props) => {
  return (
    <>
      <Input
        label="First name"
        icon="user"
        iconSize={25}
        iconPack={SimpleLineIcons}
      />

      <Input
        label="Last name"
        icon="user"
        iconSize={25}
        iconPack={SimpleLineIcons}
      />

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
        title="Sign up!"
        onPress={() => console.log("button pressed!")}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUp;

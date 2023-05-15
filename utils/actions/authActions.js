import { authenticate } from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signingUp = (firstName, lastName, email, password) => {
  console.log(firstName, lastName, email, password);

  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3333/api/1.0.0/user", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      if (response.status === 201) {
        const responseJson = await response.json();
        console.log("user created with ID: " + responseJson.user_id);
        const userData = { firstName, lastName, email, password };
        dispatch(authenticate({ token: "", userData }));
        // Use a callback function to navigate after dispatching the authenticate action
        navigation.navigate("LogIn");
      } else if (response.status === 400) {
        throw new Error("Failed validation");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logginIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3333/api/1.0.0/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 200) {
        const responseJson = await response.json();
        console.log(responseJson);
        console.log(responseJson.token);
        await AsyncStorage.setItem("@session_token", responseJson.token);
        const userid = await AsyncStorage.setItem(
          "@user_id",
          responseJson.id.toString()
        );

        const sessionToken = await AsyncStorage.getItem("@session_token");
        const userId = await AsyncStorage.getItem("@user_id");

        console.log("user logged in with ID: " + userId);
        console.log("token: " + sessionToken);

        const userData = { userid };
        dispatch(authenticate({ token: sessionToken, userData }));
      } else if (response.status === 400) {
        throw "Failed validation, check email or password";
      } else {
        throw "Something went wrong";
      }
    } catch (error) {
      console.log(error);
    }
  };
};

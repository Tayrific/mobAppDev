import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate } from "../../store/authSlice";

export const loadUser = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("@session_token");
      const id = await AsyncStorage.getItem("@user_id");

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/user/${id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
          },
        }
      );

      if (response.status === 200) {
        const responseJson = await response.json();
        console.log(responseJson);

        const userData = {
          user: responseJson,
          firstName: responseJson.first_name,
          lastName: responseJson.last_name,
          email: responseJson.email,
        };
        dispatch(authenticate({ token: token, userData }));
        console.log(userData);
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

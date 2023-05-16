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

export const updateDetails = (firstName, lastName, email) => {
  console.log(firstName, lastName, email);
  return async (dispatch) => {
      const token = await AsyncStorage.getItem("@session_token");
      const id = await AsyncStorage.getItem("@user_id");

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/user/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
          }),
        }
      );

      if (response.status === 200) {
        const responseJson = await response.json();
        console.log("updated user with ID: " + id);

        const updateData = {
          user: responseJson,
          firstName: responseJson.first_name,
          lastName: responseJson.last_name,
          email: responseJson.email,
        };

        dispatch(authenticate({ token: token, userData: updateData }));
      } else if (response.status === 400) {
        throw "Failed validation check updated details";
      } else {
        throw "Something went wrong";
      }
    
  };
};

export const loadContactList = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("@session_token");

      const response = await fetch(`http://localhost:3333/api/1.0.0/contacts`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      });

      if (response.status === 200) {
        const responseJson = await response.json();
        console.log(responseJson);

        const contactList = responseJson.contacts.map((contact) => ({
          id: contact.contact_id,
          firstName: contact.first_name,
          lastName: contact.last_name,
          email: contact.email,
        }));
        dispatch(loadContactListSuccess(contactList));
        console.log(contactList);
      } else if (response.status === 400) {
        throw "Failed validation, check request parameters";
      } else {
        throw "Something went wrong";
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadContactListSuccess = (contactList) => ({
  type: "LOAD_CONTACT_LIST_SUCCESS",
  payload: { contactList },
});

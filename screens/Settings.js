import React, { useCallback, useReducer, useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import colors from "../Constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateDetails } from "../utils/actions/loadActions";
import SubHeading from "../components/SubHeading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfImage from "../components/ProfImage";

const Settings = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadUpUser = useCallback(async () => {
    try {
      const action = await loadUser();
      dispatch(action);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, formState]);

  useEffect(() => {
    loadUpUser();
  }, [loadUpUser]);

  const userData = useSelector((state) => state.auth.userData);

  const initialState = {
    inputValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const updateHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log(formState.inputValues.firstName);
      console.log(formState.inputValues.lastName);
      console.log(formState.inputValues.email);

      const action = updateDetails(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email
      );
      setIsLoading(false);
      dispatch(action);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, formState]);

  const logOutHandler = async () => {
    console.log("Logout");
    return fetch("http://localhost:3333/api/1.0.0/logout", {
      method: "POST",
      headers: {
        "X-Authorization": await AsyncStorage.getItem("@session_token"),
      },
    })
      .then(async (response) => {
        if (response.status == 200) {
          await AsyncStorage.removeItem("@session_token");
          await AsyncStorage.removeItem("@user_id");

          navigation.navigate("Home");
        } else if (response.status == 401) {
          console.log("Unathorised");
          navigation.navigate("Login");
          await AsyncStorage.removeItem("@session_token");
          await AsyncStorage.removeItem("@user_id");
        } else {
          throw "Something went wrong";
        }
      })
      .catch((error) => {
        this.setState({ error: error });
        this.setState({ submitted: false });
      });
  };

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <PageTitle text="Settings" />
        <SubHeading text="Update your information here: " />

        <ProfImage size={100} showEdit={true} />

        <Input
          id="firstName"
          label="First name"
          icon="user"
          iconSize={25}
          iconPack={SimpleLineIcons}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities["firstName"]}
          Value={userData.firstName}
        />

        <Input
          id="lastName"
          label="Last name"
          icon="user"
          iconSize={25}
          iconPack={SimpleLineIcons}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities["lastName"]}
          Value={userData.lastName}
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
          Value={userData.email}
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

        <SubmitButton
          title="Log out!"
          onPress={logOutHandler}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    alignItems: "center",
  }
});

export default Settings;

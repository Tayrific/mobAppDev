import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import SubmitButton from "../components/SubmitButton";
import SubHeading from "../components/SubHeading";

export default function NewChat({ navigation }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onPressButton = async () => {
    setSubmitted(true);
    setError("");

    if (!name) {
      setError("*Must enter a chat name");
      return;
    }

    console.log(`Chat Name: ${name} . Created!`);

    try {
      const token = await AsyncStorage.getItem("@session_token");
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
      };
      const response = await fetch("http://localhost:3333/api/1.0.0/chat", {
        method: "post",
        headers,
        body: JSON.stringify({
          name,
        }),
      });
      const responseJson = await response.json();

      console.log("Chat Created: ", responseJson.chat_id);
      
      navigation.navigate("ChatList");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <ScrollView>
        <PageTitle text="Create Chat" />
        <View style={styles.formContainer}>
          <View style={styles.email}>
            <SubHeading text=" name: " />
            <TextInput
              style={{ height: 40, borderWidth: 1, paddingVertical: 10 }}
              placeholder=" Enter chat name"
              onChangeText={(name) => setName(name)}
              value={name}
            />

            {submitted && !name && (
              <Text style={styles.error}>*Chat name is required</Text>
            )}
          </View>

          <SubmitButton
            title="Create Chat"
            onPress={onPressButton}
            style={{ marginTop: 20 }}
          />

          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  email: {
    width: "80%",
    marginBottom: 20,
    },
  error: {
    color: "red",
  },
});

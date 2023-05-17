import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubmitButton from "../components/SubmitButton";

const UpdateChat = (props) => {
  const { chat_id } = props.route.params;
  const [newName, setNewName] = useState("");

  const updateChat = async (chatId, newName) => {
    const token = await AsyncStorage.getItem("@session_token");
    const response = await fetch(
      `http://localhost:3333/api/1.0.0/chat/${chatId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
        body: JSON.stringify({
          name: newName,
        }),
      }
    );

    if (response.ok) {
      const updatedChat = await response.json();
      console.log(updatedChat);
      return updatedChat;
    } else if (response.status === 400) {
      console.log("Bad request");
    } else if (response.status === 401) {
      console.log("Unauthorized");
    } else if (response.status === 403) {
      console.log("Forbidden");
    } else if (response.status === 404) {
      console.log("Not Found");
    } else {
      console.log("Server Error");
    }
  };

  return (
    <PageContainer>
      <PageTitle text="Update Chat" />
      <View style={styles.container}>
        <Text style={styles.label}>New Chat Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNewName}
          value={newName}
        />

        <SubmitButton
          title="Update name"
          onPress={updateChat(chat_id, newName)}
          style={{ marginTop: 20 }}
        />
        
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UpdateChat;

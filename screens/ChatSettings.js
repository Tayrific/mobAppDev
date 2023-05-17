import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PageContainer from "../components/PageContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageTitle from "../components/PageTitle";
import colors from "../Constants/colors";
import SubmitButton from "../components/SubmitButton";

const ChatSettings = (props) => {
  const { chat_id } = props.route.params;
  const [chatDetails, setChatDetails] = useState(null);

  const getChatDetails = async (chatId) => {
    const token = await AsyncStorage.getItem("@session_token");
    const response = await fetch(
      `http://localhost:3333/api/1.0.0/chat/${chatId}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      }
    );

    if (response.ok) {
      const chatDetails = await response.json();
      setChatDetails(chatDetails);
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

  useEffect(() => {
    getChatDetails(chat_id);
  }, []);

  return (
    <PageContainer>
      <PageTitle settings screen />
      {chatDetails ? (
        <>
          <Text style={styles.detailsText}>Chat name: {chatDetails.name}</Text>
          <Text style={styles.detailsText}>
            Creator: {chatDetails.creator.first_name}
          </Text>
          <Text style={styles.detailsText}>
            Members: {chatDetails.members.length}
          </Text>

          <SubmitButton
            title="Update chat name"
            onPress={() =>
              props.navigation.navigate("UpdateChat", {
                chat_id: chat_id,
              })
            }
            style={{ marginTop: 20 }}
          />

          <Text style={styles.detailsText}> current chat members:</Text>

          <SubmitButton
            title="Add user to chat"
            onPress={() => props.navigation.navigate("AddUser")}
            style={{ marginTop: 20 }}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "bold",
    color: colors.brown,
    marginVertical: 10,
  },
});

export default ChatSettings;

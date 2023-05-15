import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import PageContainer from "../components/PageContainer";

const ChatListScreen = (props) => {
  return (
    <PageContainer style={styles.container}>
      <Text>Contacts list screen</Text>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatListScreen;
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PageContainer from "../components/PageContainer";

const ChatSettings = (props) => {
  return (
  
      <PageContainer>
        <Text>Chat settings screen</Text>
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

export default ChatSettings;

import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import PageContainer from "../components/PageContainer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const ChatListScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="new Chat"
           iconName="create" 
           onPress={() => props.navigation.navigate("NewChat")} />
        </HeaderButtons>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Chat list screen</Text>

      <Button
        title="go to ChatScreen"
        onPress={() => props.navigation.navigate("ChatScreen")}
      />
    </View>
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

import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import PageContainer from "../components/PageContainer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector } from "react-redux";

const ChatListScreen = (props) => {
  
      const stateData = useSelector((state) => state.auth);
      console.log(stateData);
      console.log(stateData.userData.userId);
      const selectedUserId = props.route?.params?.selectedUserId;

      
    


  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="new Chat"
            iconName="create"
            onPress={() => props.navigation.navigate("NewChat")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  useEffect(() => {

    if (!selectedUserId) {
      return;
    }

    const chatUsers = [selectedUserId, stateData.userData.userId];

    props.navigation.navigate("ChatScreen", { users: chatUsers });

  }, [selectedUserId]);

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

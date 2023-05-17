import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import PageContainer from "../components/PageContainer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatListScreen = (props) => {
  const [contacts, setContacts] = useState([]);
  const [chats, setChats] = useState([]);
  const stateData = useSelector((state) => state.auth);
  console.log(stateData);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="new Chat"
            iconName="edit"
            onPress={() => props.navigation.navigate("NewChat")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

   const loadChats = async () => {
     const token = await AsyncStorage.getItem("@session_token");
     const response = await fetch("http://localhost:3333/api/1.0.0/chat", {
       method: "get",
       headers: {
         "Content-Type": "application/json",
         "X-Authorization": token,
       },
     });

     if (response.ok) {
       const chats = await response.json();
       setChats(chats);

       console.log("chats loaded successfully");
     } else {
       console.log("Error loading chats:", response.statusText);
     }
   };

    useEffect(() => {
      loadChats();
    }, []);

    const displayChats = () => {
      return chats.map((chat) => {
        return (
          <View key={chat.chat_id}>
            <Text>{chat.name}</Text>
          </View>
        );
      });
    };


  return (
    <PageContainer>
      <View style={styles.container}>
        <Text>Chat list screen</Text>
        {displayChats()}

        <Button
          title="go to ChatScreen"
          onPress={() => props.navigation.navigate("ChatScreen")}
        />
      </View>
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

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PageContainer from "../components/PageContainer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Constants/colors";
import PageTitle from "../components/PageTitle";

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
        <TouchableOpacity
          key={chat.chat_id}
          style={styles.chat}
          onPress={() => props.navigation.navigate("ChatScreen")}
        >
          <AntDesign name="star" size={24} color={colors.lightPink} />
          <Text style={styles.chatText}>{chat.name}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <PageTitle text="Chat list screen" />
          {displayChats()}
        </View>
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  chat: {
    backgroundColor: colors.nearlyWhite,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 150,
    padding: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  chatText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.brown,
    marginLeft: 16,
  },
});

export default ChatListScreen;

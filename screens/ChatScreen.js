import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

import backgroundImage from "../assets/images/background.jpeg";
import colors from "../Constants/colors";

const ChatScreen = (props) => {

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="add User"
            iconName="cog"
            onPress={() => props.navigation.navigate("ChatSettings")}
          />
        </HeaderButtons>
      ),
    });
  }, []);
  const [messageText, setMessageText] = useState("");

  const sendMessage = useCallback(() => {
    setMessageText("");
  }, [messageText]);

  return (
    <SafeAreaView edges={["right", "left", "bottom"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
        ></ImageBackground>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => console.log("pressed!")}
          >
            <Entypo name="plus" size={24} color={colors.red} />
          </TouchableOpacity>

          <TextInput
            style={styles.textbox}
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
            onSubmitEditing={sendMessage}
          />

          {messageText === "" && (
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => console.log("pressed!")}
            >
              <Entypo name="camera" size={24} color={colors.red} />
            </TouchableOpacity>
          )}

          {messageText !== "" && (
            <TouchableOpacity
              style={{ ...styles.mediaButton, ...styles.sendButton }}
              onPress={sendMessage}
            >
              <FontAwesome name="send" size={20} color={"white"} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  textbox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.brown,
    backgroundColor: colors.nearlyWhite,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  sendButton: {
    backgroundColor: colors.lightPink,
    borderRadius: 30,
    padding: 8,
    width: 35,
  },
  keyboard: {
    flex: 1,
  },
});

export default ChatScreen;

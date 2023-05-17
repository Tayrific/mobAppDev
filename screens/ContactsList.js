import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PageContainer from "../components/PageContainer";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageTitle from "../components/PageTitle";
import SubHeading from "../components/SubHeading";
import SubmitButton from "../components/SubmitButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import colors from "../Constants/colors";

const ContactsList = (props) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Block User"
            iconName="block"
            onPress={() => props.navigation.navigate("Blocked")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const response = await fetch("http://localhost:3333/api/1.0.0/contacts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    });

    if (response.ok) {
      const users = await response.json();
      setUsers(users);

      console.log("users loaded successfully");
    } else {
      console.log("Error loading users:", response.statusText);
    }
  };

  const displayContacts = () => {
    return users.map((user, index) => {
      return (
        <TouchableOpacity key={index} style={styles.user}>
          <Text style={styles.textUser}>
            name ={user.first_name} {user.last_name}
          </Text>
          <Text style={styles.textUser}> email = {user.email}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <PageContainer>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <PageTitle text="Contacts List" />
          <SubHeading text="Here's a list of your contacts" />

          <SubmitButton
            title="Add New Contact"
            onPress={() => props.navigation.navigate("AddContact")}
            style={{ marginTop: 20 }}
          />
          <SubmitButton
            title="Remove a Contact"
            onPress={() => props.navigation.navigate("RemoveContact")}
            style={{ marginTop: 20 }}
          />
          {displayContacts()}
        </ScrollView>
      </View>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",

    padding: 20,
  },
  user: {
    backgroundColor: colors.nearlyWhite,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 100,
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
  textUser: {
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.brown,
    marginHorizontal: 8,
  },
});

export default ContactsList;

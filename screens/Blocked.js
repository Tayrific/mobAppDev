import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import PageContainer from "../components/PageContainer";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageTitle from "../components/PageTitle";
import SubHeading from "../components/SubHeading";
import SubmitButton from "../components/SubmitButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const ContactsList = (props) => {
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    //loadContacts();
    loadBlocked();
  }, []);

  const loadBlocked = async () => {
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

  const addUser = async () => {};

  return (
    <PageContainer>
      <ScrollView>
        <SubHeading text="here's a list of your blocked contacts " />
        <SubmitButton
          title="Block contact"
          onPress={() => props.navigation.navigate("AddBlock")}
          style={{ marginTop: 20 }}
        />
        <SubmitButton
          title="Unblock a contact"
          onPress={() => props.navigation.navigate("UnblockContact")}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
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

export default ContactsList;

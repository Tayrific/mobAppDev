import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import PageContainer from "../components/PageContainer";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageTitle from "../components/PageTitle";
import SubHeading from "../components/SubHeading";
import SubmitButton from "../components/SubmitButton";



const ContactsList = (props) => {
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    //loadContacts();
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



  const addUser = async () => {

  }


  return (
    <PageContainer>
      <ScrollView>
        <PageTitle text="Contacts List" />
        <SubHeading text="here's a list of your contacts " />
        <SubmitButton
          title="add new contact"
          onPress={() => props.navigation.navigate("AddContact")}
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

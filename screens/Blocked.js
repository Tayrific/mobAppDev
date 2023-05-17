import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PageContainer from "../components/PageContainer";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubHeading from "../components/SubHeading";
import SubmitButton from "../components/SubmitButton";

const Blocked = (props) => {
  const [contacts, setContacts] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    //loadContacts();
    loadBlocked();
  }, []);

  const loadBlocked = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const response = await fetch("http://localhost:3333/api/1.0.0/blocked", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    });

    if (response.ok) {
      const blocked = await response.json();
      console.log(blocked);
      setBlocked(blocked);

      console.log("blocked loaded successfully");
    } else {
      console.log("Error loading blocked contacts:", response.statusText);
    }
  };

  const displayBlocked = () => {
      console.log("displayBlocked called");

    return blocked.map((blocked, index) => {
      return (
        <TouchableOpacity key={index} style={styles.blockedItem}>
          <Text>{blocked.first_name}</Text>
          <Text>{blocked.email}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <PageContainer>
      <ScrollView>
        <SubHeading text="Here's a list of your blocked contacts:" />
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

        {displayBlocked()}
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  blockedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Blocked;

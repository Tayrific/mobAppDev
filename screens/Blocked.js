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

  const unblockContact = async (userId) => {
    const token = await AsyncStorage.getItem("@session_token");
    const response = await fetch(
      `http://localhost:3333/api/1.0.0/user/${userId}/block`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      }
    );

    if (response.ok) {
      console.log("Contact unblocked successfully");
    } else if (response.status === 400) {
      console.log("You can't block yourself");
    } else if (response.status === 401) {
      console.log("Unauthorized");
    } else if (response.status === 404) {
      console.log("Not Found");
    } else {
      console.log("Server Error");
    }
  };

 const displayBlocked = () => {
   return blocked.map((blocked, index) => {
     return (
       <TouchableOpacity
         key={index}
         style={styles.blockedItem}
         onPress={() => unblockContact(blocked.user_id)}
       >
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
        <SubHeading text="Click a name to unblock!" />
        <SubmitButton
          title="Block contact"
          onPress={() => props.navigation.navigate("AddBlock")}
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

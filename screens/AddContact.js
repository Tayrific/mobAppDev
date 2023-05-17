import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import colors from "../Constants/colors";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import DataItem from "../components/DataItems";
import PageContainer from "../components/PageContainer";
import { searchUsers } from "../utils/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddContact = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [noResults, setNoResults] = useState(false);
  const [SearchTerm, setSearchTerm] = useState("");
  const stateData = useSelector((state) => state.auth);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="close" onPress={() => props.navigation.goBack()} />
        </HeaderButtons>
      ),
      headerTitle: "Add Contact",
    });
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!SearchTerm || SearchTerm === "") {
        setUsers();
        setNoResults(false);
        return;
      }
      setIsLoading(true);
      const results = await searchUsers(SearchTerm, "all", 20, 0);
      delete results[stateData.userData.userId];
      setUsers(results);

      if (Object.keys(results).length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [SearchTerm]);

  const addContact = async (userId) => {
    const token = await AsyncStorage.getItem("@session_token");
    const response = await fetch(
      `http://localhost:3333/api/1.0.0/user/${userId}/contact`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      }
    );

    if (response.ok) {
      console.log("Contact added successfully");
    } else if (response.status === 400) {
      console.log("You can't add yourself as a contact");
    } else if (response.status === 401) {
      console.log("Unauthorized");
    } else if (response.status === 404) {
      console.log("Not Found");
    } else {
      console.log("Server Error");
    }
  };

  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={15} color={colors.brown} />
        <TextInput
          placeholder="Search"
          style={styles.searchBox}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.brown} />
        </View>
      )}
      {!isLoading && !noResults && users && (
        <FlatList
          data={Object.keys(users)}
          renderItem={({ item }) => {
            const { user_id } = users[item];
            console.log(user_id);

            const { given_name, family_name, email } = users[item];
            return (
              <DataItem
                title={`${given_name} ${family_name}`}
                subTitle={email}
                onPress={() => addContact(user_id)}
              />
            );
          }}
        />
      )}

      {!isLoading && noResults && (
        <View style={styles.center}>
          <FontAwesome
            name="exclamation"
            size={55}
            color={colors.lightPink}
            style={styles.NoResult}
          />
          <Text style={styles.NoResultText}>NoUsersFound</Text>
        </View>
      )}

      {!isLoading && !users && (
        <View style={styles.center}>
          <FontAwesome
            name="users"
            size={55}
            color={colors.lightPink}
            style={styles.NoResult}
          />
          <Text style={styles.NoResultText}>Search for users</Text>
        </View>
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.nearlyWhite,
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBox: {
    marginLeft: 10,
    fontSize: 15,
    width: "100%",
  },
  NoResult: {
    marginBottom: 20,
  },
  NoResultText: {
    color: colors.brown,
    letterSpacing: 0.3,
    fontFamily: "regular",
  },
});

export default AddContact;

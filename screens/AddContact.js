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
            const userId = item.item;

            const { given_name, family_name, email } = users[item];
            return (
              <DataItem
                title={`${given_name} ${family_name}`}
                subTitle={email}
                onPress={() => userSelected(userId)}
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

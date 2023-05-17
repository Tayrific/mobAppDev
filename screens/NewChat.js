import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import PageContainer from "../components/PageContainer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../Constants/colors";
import commonStyles from "../Constants/commonStyles";

const NewChat = (props) => {
  const [isLoding, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [noResults, setNoResults] = useState(false);
  const [SearchTerm, searchTerm] = useState(false);


  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="close" onPress={() => props.navigation.goBack()} />
        </HeaderButtons>
      ),
      headerTitle: "New Chat",
    });
  }, []);

  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={15} color={colors.brown} />
        <TextInput placeholder="Search" style={styles.searchBox} />
      </View>

      {!isLoding && noResults && (
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

      {!isLoding && !users && (
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

export default NewChat;

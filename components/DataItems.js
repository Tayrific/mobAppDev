import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import ProfImage from "./ProfImage";
import colors from "../Constants/colors";
const DataItem = (props) => {

    const {title, subTitle, image} = props;
  return (
    <TouchableWithoutFeedback onPress= {props.onPress}>
      <View style={styles.container}>
        <ProfImage uri={image} size={40} />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>

          <Text numberOfLines={1} style={styles.subTitle}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 60,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: "regular",
    color: colors.brown,
    letterSpacing: 0.3,
  },
});


export default DataItem;

import { StyleSheet, Text, View } from "react-native";
import colors from "../Constants/colors";

export default function SubHeading(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.brown,
    fontFamily: "bold",
    letterSpacing: 0.3,
    textAlign: "center",
  },
});

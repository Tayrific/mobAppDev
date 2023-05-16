import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../Constants/colors";
import { useEffect, useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState(props.initialValue || "");

    useEffect(() => {
      setValue(props.Value || "");
    }, [props.Value]);

  const onChangeText = text => {
    setValue(text);
    props.onInputChanged(props.id, text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>

      <View style={styles.inputContainer}>
        {props.icon && (
          <props.iconPack
            name={props.icon}
            size={props.iconSize || 15}
            style={styles.icon}
          />
        )}
        <TextInput
          {...props}
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
        />
      </View>

      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText[0]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.nearlyWhite,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lightPink,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 10,
    color: colors.brown,
  },
  label: {
    marginVertical: 10,
    marginHorizontal: 30,
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: colors.textColor,
    fontSize: 18,
  },
  input: {
    color: colors.textColor,
    flex: 1,
    fontFamily: "regular",
    letterSpacing: 0.3,
    paddingtop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 15,
    fontFamily: "bold",
    letterSpacing: 0.3,
    marginHorizontal: 30,
  },
});

export default Input;

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import defaultUser from "../assets/images/defaultUser.png";
import colors from "../Constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkMediaLibraryPermission = async () => {
  const permissionReq = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionReq.granted) {
    return Promise.reject("Permission to access camera roll is required!");
  }
  console.log("checkMediaLibraryPermission");
  return Promise.resolve();
};

const ProfImage = (props) => {
  const [image, setImage] = useState(
    props.uri ? { uri: props.uri } : defaultUser
  );

  const changeImage = async () => {
    try {
      await checkMediaLibraryPermission();
      const tempUri = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!tempUri.cancelled) {
        setImage({ uri: tempUri.uri });
        sendToServer(tempUri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendToServer = async (tempUri) => {
    const token = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");
    let res = await fetch(tempUri.uri);
    console.log(tempUri.uri);
    let blob = await res.blob();

    return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/photo/", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "image/png",
        "X-Authorization": token,
      },
      body: blob,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Picture added", response);
          alert("Picture added successfully");
          navigation.navigate("Profile");
        } else if (response.status === 400) {
          throw "Bad request";
        } else {
          throw "Something went wrong";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TouchableOpacity onPress={changeImage}>
      <Image
        style={{
          ...styles.image,
          ...{ width: props.size, height: props.size },
        }}
        source={image}
      />

      <View style={styles.edit}>
        <FontAwesome name="edit" size={30} color={colors.brown} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  edit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.evenLighterPink,
    borderRadius: 20,
  },
});

export default ProfImage;

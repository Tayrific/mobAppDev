import React, { Component, useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./src/screens/login";
import ChatListScreen from "./src/screens/ChatList";
import ChatSettings from "./src/screens/ChatSettings";
import Settings from "./src/screens/Settings";

//splash screen while waiting for everything to load
SplashScreen.preventAutoHideAsync();
const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitle: "" }}>
      <Tab.Screen
        name="chatList"
        component={ChatListScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubbles" size={size} color= {color} /> // chat icons
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings" size={size} color= {color}/> //settings icon
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          //adding fonts
          Daruma: require("./assets/Fonts/DarumadropOne-Regular.ttf"),
        });
      } catch (error) {
        console.log.error();
      } finally {
        setAppIsLoaded(true);
      }
    };
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayout}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="ChatSettings"
            component={ChatSettings}
            options={{ gestureEnabled: true, headerTitle: "Settings" }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  label: {
    fontSize: 25,
    fontFamily: "Daruma",
  },
});

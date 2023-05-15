import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ChatListScreen from "../screens/ChatList";
import ChatSettings from "../screens/ChatSettings";
import Settings from "../screens/Settings";
import ChatScreen from "../screens/ChatScreen";
import Contacts from "../screens/ContactsList";
import colors from "../Constants/colors";

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: "",
        headerShadowVisible: false,
        headerTransparent: true,
      }}
    >
      <Tab.Screen
        name="chatList"
        component={ChatListScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={colors.red} /> // chat icons
          ),
        }}
      />
      <Tab.Screen
        name="ContactsList"
        component={Contacts}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="perm-contact-cal"
              size={size}
              color={colors.red}
            /> //contacts icon
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={colors.red} /> //settings icon
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = (props) => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ gestureEnabled: true }}
      />
      <stack.Screen
        name="ChatSettings"
        component={ChatSettings}
        options={{ gestureEnabled: true, headerTitle: "Settings" }}
      />
    </stack.Navigator>
  );
};
export default MainNavigator;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../src/screens/login";
import ChatListScreen from "../src/screens/ChatList";
import ChatSettings from "../src/screens/ChatSettings";
import Settings from "../src/screens/Settings";
import ChatScreen from "../src/screens/ChatScreen";

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

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ChatList from "../screens/ChatList";
import ChatSettings from "../screens/ChatSettings";
import Settings from "../screens/Settings";
import ChatScreen from "../screens/ChatScreen";
import Contacts from "../screens/ContactsList";
import colors from "../Constants/colors";
import NewChat from "../screens/NewChat";
import AddContact from "../screens/AddContact";
import RemoveContact from "../screens/RemoveContact";
import Blocked from "../screens/Blocked";
import AddBlock from "../screens/AddBlock";
import UnblockContact from "../screens/UnblockContact";

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
        name="ChatList"
        component={ChatList}
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
      <stack.Group>
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
      </stack.Group>

      <stack.Group screenOptions={{ presentation: "containedModal" }}>
        <stack.Screen name="NewChat" component={NewChat} />
        <stack.Screen name="AddContact" component={AddContact} />
        <stack.Screen name="RemoveContact" component={RemoveContact} />
        <stack.Screen name="Blocked" component={Blocked} />
        <stack.Screen name="AddBlock" component={AddBlock} />
        <stack.Screen name="UnblockContact" component={UnblockContact} />
      </stack.Group>
    </stack.Navigator>
  );
};
export default MainNavigator;

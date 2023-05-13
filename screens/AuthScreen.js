import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageContainer from "../components/PageContainer";

import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import colors from "../Constants/colors";

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardAvoid}>
            {isSignUp ? <SignUp /> : <LogIn />}

            <TouchableOpacity
              onPress={() => setIsSignUp((prevState) => !prevState)}
              style={styles.switchContainer}
            >
              <Text style={styles.switch}>
                {` ${isSignUp ? "Sign in" : "Create account"}`}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  switch: {
    color: colors.brown,
    fontFamily: "medium",
    letterSpacing: 0.3,
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: "center",
  },
});

export default AuthScreen;

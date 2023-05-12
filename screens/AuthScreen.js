import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageContainer from "../components/PageContainer";

import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";

const AuthScreen = (props) => {

    const [isSignUp, setIsSignUp] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        {
            isSignUp ?
            <SignUp /> :
            <LogIn />
        }
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AuthScreen;

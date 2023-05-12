import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import * as EmailValidator from "email-validator";
import { useNavigation } from "@react-navigation/native";
import signUp from "./signup";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      submitted: false,
    };
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    this.setState({ submitted: true });
    this.setState({ error: "" });

    if (!(this.state.email && this.state.password)) {
      this.setState({ error: "Must enter email and password" });
      return;
    }

    if (!EmailValidator.validate(this.state.email)) {
      this.setState({ error: "Must enter valid emai" });
      return;
    }

    const PASSWORD_REGEX = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    );
    if (!PASSWORD_REGEX.test(this.state.password)) {
      this.setState({
        error:
          "INCORRECT PASSWORD: Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)",
      });
      return;
    } else {
      this.setState({ error: "success!" });
    }

    console.log(
      "Button clicked: " + this.state.email + " " + this.state.password
    );
    console.log("Successfully Logged in");
  }

  render() {
    return (
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView>
          <View style={styles.formContainer}>
            <Text style={[styles.login]}> WhatsThat </Text>
            <View style={styles.email}>
              <Text>Email:</Text>

              <TextInput
                style={{ height: 50, borderWidth: 1, width: "100%" }}
                placeholder="Max@stu.mmu.ac.uk"
                onChangeText={(email) => this.setState({ email })}
                defaultValue={this.state.email}
              />

              <>
                {this.state.submitted && !this.state.email && (
                  <Text style={styles.error}>*Email is required</Text>
                )}
              </>
            </View>

            <View style={styles.password}>
              <Text>Password:</Text>
              <TextInput
                style={{ height: 50, borderWidth: 1, width: "100%" }}
                placeholder="password"
                onChangeText={(password) => this.setState({ password })}
                defaultValue={this.state.password}
                secureTextEntry
              />

              <>
                {this.state.submitted && !this.state.password && (
                  <Text style={styles.error}>*Password is required</Text>
                )}
              </>
            </View>

            <View style={styles.loginbtn}>
              <TouchableOpacity onPress={this._onPressButton}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>

            <>
              {this.state.error && (
                <Text style={styles.error}>{this.state.error}</Text>
              )}
            </>

            <View>
              <Text style={styles.signup}>Create account</Text>
              <Button
                title="Sign Up"
                onPress={() => useNavigation.navigate("signUp")}
              />
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  login: {
    textAlign: "center",
    padding: 20,
    fontWeight: "900",
    color: "#0818A8",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    marginBottom: 5,
  },
  password: {
    marginBottom: 10,
  },
  loginbtn: {},
  signup: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
  button: {
    marginBottom: 20,
    backgroundColor: "#0818A8",
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontWeight: "900",
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "./navigations/Navigation";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import store from "./store";
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

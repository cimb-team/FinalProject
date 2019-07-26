import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableHighlight
} from "react-native";
import Title from "../components/Title";
export default function Profile(props) {
  return (
      <SafeAreaView style={styles.container}>
      <Title
      title="Profile"
      style={styles.text}
    />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  text: {
    textAlign: "center",
    margin: 5,
    fontSize: 25,
    fontWeight: "bold"
  },
});

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
  TextInput
} from "react-native";

export default function Title(props) {

  return (
    <View
    style={{
      marginVertical: 10,
      padding: 10,
      backgroundColor: "#f5f5f5",
      borderRadius: 20,
      margin: 10
    }}
  >
    <Text
      style={{
        textAlign: "center",
        margin: 5,
        fontSize: 25,
        fontWeight: "bold"
      }}
    >
      {props.title}
    </Text>
  </View>
  );
}

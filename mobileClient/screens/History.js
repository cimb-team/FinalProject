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
  TextInput,
  TouchableHighlight
} from "react-native";
import Title from "../components/Title";
export default function History(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="History" style={styles.text} />
      <View style={styles.card}>
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "600",
            marginBottom: 10
          }}
        >
          Status: WIN
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10
            }}
          >
            <Image
              style={{
                width: 150,
                height: 120,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10
              }}
              source={{
                uri: "https://i.ibb.co/CH4jrj5/illustrator4.jpg"
              }}
            />
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "600",
                marginBottom: 10
              }}
            >
              Smoke
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "400",
                marginBottom: 10
              }}
            >
              Abstract
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "400",
                marginBottom: 10
              }}
            >
              24/07/2019
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "400",
                marginBottom: 10
              }}
            >
              $22
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "400",
                marginBottom: 10
              }}
            >
              Bought from Orvin Savero
            </Text>
          </View>
        </View>
      </View>


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
  search: {
    height: 35,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.5,
    width: 250
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    margin: 10,
    width: "95%",
    borderRadius: 10,
    padding: 10
  }
});

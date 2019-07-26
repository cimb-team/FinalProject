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
export default function Products(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Products" style={styles.text} />

      <View style={styles.flex}>
        <View style={styles.card}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 250,
                height: 320,
                alignItems: "center",
                justifyContent: "center",
              }}
              source={{
                uri:
                  "https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }}
            />
          </View>
          <Text style={{ textAlign: "center", margin: 10 }}>
            Red Purple Smoke
          </Text>
          <Text style={{ textAlign: "center", margin: 10 }}>Price: $9.99</Text>
          <Text style={{ textAlign: "center", margin: 10 }}>
            Details: One of the biggest mistery of line, where smokes glow
          </Text>
          <Text style={{ textAlign: "center", margin: 10 }}>
            Category: Abstract
          </Text>
          <TouchableHighlight style={{ margin: 10 }}>
            <Button title="Details" />
          </TouchableHighlight>
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
  card: {
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    margin: 10,
    width: 250
  },
  flex: { alignItems: "center", flexDirection: "column" }
});

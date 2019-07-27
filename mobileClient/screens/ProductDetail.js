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
export default function ProductDetail(props) {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.card}>
        <View
          style={{
            marginVertical: 10,
            borderRadius: 10
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
              color: "black",
              marginBottom: 10
            }}
          >
            Smoke 24/7
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
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={{
              width: '90%',
              height: 200,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10
            }}
            source={{
              uri:
                "https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Text
            style={{
              color: "black",
              fontWeight: "600",
              textAlign: "center",
              marginHorizontal: 15
            }}
          >
            Details
          </Text>
          <Text
            style={{
              color: "black",
              fontWeight: "400",
              textAlign: "justify",
              margin: 15
            }}
          >
            Clouds come floating into my life, no longer to carry rain or usher
            storm, but to add color to my sunset sky.
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{flexDirection: 'row', justifyContent: 'center', width: 412, marginVertical: 20}}>
          <TextInput style={styles.search} placeholder="$" />
          <View
            style={{
              padding: 10,
              backgroundColor: "#3399ff",
              width: 100,
              borderRadius: 10,
              marginLeft: 10
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              BID
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: "#f5f5f5",
            width: 200,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 2.5
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "600",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            Initial Price: $20
          </Text>
        </View>

        <View
          style={{
            padding: 10,
            backgroundColor: "#f5f5f5",
            width: 200,
            borderRadius: 10,
            margin: 2.5
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "400",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            Bid 2: $25
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: "#f5f5f5",
            width: 200,
            borderRadius: 10,
            margin: 2.5
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "400",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            Bid 1: $21
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
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
    width: '95%',
    borderRadius: 10
  },
  search: {
    height: 35,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.5,
    width: 150
  }
});

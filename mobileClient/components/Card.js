import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';

export default function eachCard(props) {
  useEffect(() => {}, []);

  return (
    <TouchableHighlight
      onPress={() =>
        props.navigation.navigate("ProductDetail", {
          id: props.product._id
        })
      }
    >
      <Card>
        <CardItem>
          <Body style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ width: "45%" }}>
              <Image
                source={{ uri: props.product.images[0] }}
                style={{ height: 120, width: 150 }}
              />
            </View>
            <View style={{ width: "55%", height: "100%", flex: 1 }}>
              <View style={{ height: 90 }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginTop: 3 }}
                >
                  {props.product.title}
                </Text>
                <Text style={{ fontSize: 13 }}>{props.product.details}</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 30,
                  flexDirection: "row",
                  alignItems: "flex-end"
                }}
              >
                <View style={{ width: "22%" }}>
                  <Text style={{ fontSize: 10 }}>
                    {props.product.closedDate}
                  </Text>
                </View>
                <View style={{ width: "38%" }}>
                  <Text style={{ fontSize: 10 }}>{props.product.category}</Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text style={{ fontSize: 10 }}>
                    {props.product.initialPrice}
                  </Text>
                </View>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
    </TouchableHighlight>
  );
}

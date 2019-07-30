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
  TouchableHighlight,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';


const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default function eachCard(props) {
  useEffect(() => {
    
  }, []);

  return (
    <TouchableHighlight
      onPress={() =>
        props.navigation.navigate("ProductDetail", {
          id: props.product._id
        })
      }
    >
      <Card style={{borderRadius:10, borderColor:'#EE5537'}}> 
        <CardItem style={{borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomLeftRadius:10,borderBottomRightRadius:10}} >
          <Body style={{ flexDirection: "row", width: "100%", }}>
            <View style={{ width: "35%",height:'100%',alignItems:'center' }}>
              <Image
                source={{ uri: props.product.images[0] }}
                style={{ height: height*0.15, width: width*0.285}}
              />
            </View>
            <View style={{ width: "65%", height: "100%", flex: 1 }}>
              <View style={{ height: height*0.12, paddingLeft:10 }}>
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", marginTop: 3, color:'#EE5537' }}
                >
                  {props.product.title}
                </Text>
                <Text style={{ fontSize: 13 }}>{`${props.product.details.substring(1, 80)}....`}</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  paddingLeft:10
                }}
              >
                <View style={{  }}>
                  <Text style={{ fontSize: 11 }}>Artist : <Text style={{ color: "#EE5537"}}> {props.product.userId.name}</Text></Text>
                  
                </View>
                <View style={{ }}>
                  <Text style={{ fontSize: 11 }}>Category :<Text style={{ color: "#EE5537"}}> {props.product.category}</Text></Text>
                </View>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
    </TouchableHighlight>
  );
}

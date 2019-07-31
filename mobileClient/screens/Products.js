import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/Card";
import React, { Fragment, useState, useEffect } from "react";
import { getAllProducts } from "../store/action";
import { connect } from "react-redux";
import TopBar from "../components/TopBar";
import Constants from "expo-constants";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get("window");
const height = width * 0.6;

const ProductDummy = [
  {
    id: 1,
    title: "Street Art Grafity",
    price: "1.000.000",
    desc: "Now lets try for a Horizontal gradient. gradient...",
    artist: "Rendy",
    uri: require("../assets/productDummy/illustrator1.jpg")
  },
  {
    id: 2,
    title: "Mario Characther Design",
    price: "1.500.000",
    desc: "Now lets try for a Horizontal gradient. gradient...",
    artist: "sukma",
    uri: require("../assets/productDummy/character1.jpg")
  },
  {
    id: 3,
    title: "Angry Face Illustration",
    price: "6.000.000",
    desc: "Now lets try for a Horizontal gradient. gradient...",
    artist: "Jani",
    uri: require("../assets/productDummy/illustrator2.jpg")
  },
  {
    id: 4,
    title: "Lion Face Illustrator",
    price: "3.000.000",
    desc: "Now lets try for a Horizontal gradient. gradient...",
    artist: "Karin",
    uri: require("../assets/productDummy/illustrator4.jpg")
  },
  {
    id: 5,
    title: "Monkey Astronaut",
    price: "2.000.000",
    desc: "Now lets try for a Horizontal gradient. gradient...",
    uri: require("../assets/productDummy/illustrator7.jpg")
  },
  {
    id: 6,
    title: "Street Art Grafity",
    price: "1.000.000",
    desc: "Now lets try for a Horizontal gradient. gradient...",
    artist: "Garin",
    uri: require("../assets/productDummy/illustrator1.jpg")
  },
  {
    id: 7,
    title: "Street Art Grafity",
    price: "5000.000",
    desc: "Now lets try for a Horizontal gradient. gradient...",
    artist: "Kevin",
    uri: require("../assets/productDummy/illustrator6.jpg")
  }
];

function Product(props) {
  const [images, setImage] = useState([
    {
      id: 1,
      title: "Street Art Grafity",
      price: "12000",
      desc: "Now lets try for a Horizontal gradient. gradient...",
      uri: "https://i.ibb.co/p1QwTC7/illustrator7.jpg"
    },
    {
      id: 2,
      title: "Floral",
      price: "12000",
      desc: "Now lets try for a Horizontal gradient. gradient...",
      uri: "https://i.ibb.co/CH4jrj5/illustrator4.jpg"
    },
    {
      id: 3,
      title: "Nature Food Logo",
      price: "12000",
      desc: "Now lets try for a Horizontal gradient. gradient...",
      uri: "https://i.ibb.co/prP4KkY/illustrator1.jpg"
    }
  ]);
  // useEffect(() => {
  //   props.getAllProducts(props.token);
  // }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => props.getAllProducts(props.token)}
      />
      <View style={{ width: "100%" }}>
        <TopBar navigation={props.navigation} screen={'products'} />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
        >
          {images.map(image => (
            <View style={{ width: "33.35%", height: "100%" }} key={image.id}>
              <Image style={styles.image} source={{ uri: image.uri }} />
              <View
                style={{
                  backgroundColor: "transparent",
                  height: "35%",
                  width: "100%",
                  marginTop: "45%",
                  position: "absolute"
                }}
              >
                <LinearGradient
                  colors={["transparent", "#524F4F"]}
                  style={{ flex: 1 }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 18,
                      marginTop: 10,
                      marginLeft: 10
                    }}
                  >
                    {image.title}
                  </Text>
                  <Text style={{ color: "black", marginLeft: 10 }}>
                    {image.desc}
                  </Text>
                </LinearGradient>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{
          // height: "100%",
          width: "90%",
          // marginTop: 6,
          // marginBottom: "25%"
        }}>
          {!props.allProductsLoading && (
            <Fragment>
              {props.allProductsData.map(product => {
                return (
                <Card
                  key={product._id}
                  product={product}
                  navigation={props.navigation}
                />
              )})}
            </Fragment>
          )}
        </ScrollView>
    </View>
  );
}
const mapStateToProps = state => {
  return {
    allProductsData: state.allProducts.data,
    allProductsError: state.allProducts.error,
    allProductsLoading: state.allProducts.loading,
    token: state.token
  };
};
const mapDispatchToProps = {
  getAllProducts
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "white"
  },
  scrollContainer: {
    height: "34.5%",
    width: "100%",
    backgroundColor: "transparent"
  },
  image: {
    width,
    height
  }
});

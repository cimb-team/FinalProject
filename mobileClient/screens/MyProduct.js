import React, { Fragment, useState, useEffect } from "react";
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
  TouchableHighlight,
  StatusBar
} from "react-native";
import Constants from "expo-constants";
import TopBar from "../components/TopBar";
import { getMyProducts } from "../store/action";
import Card from "../components/Card";
import { connect } from "react-redux";
import Title from "../components/Title";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';

function MyProduct(props) {
  useEffect(() => {
    props.getMyProducts(props.token);
  }, []);

  const handleViewRef = ref => this.view = ref;
  const animation = () => this.view.fadeInUp(300)

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents
        onWillBlur={animation}
        onWillFocus={animation}
      />
      <Animatable.View ref={handleViewRef}>
        <TopBar navigation={props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginVertical: 10,
              borderRadius: 20,
              margin: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                fontWeight: "bold",
                color: "black"
              }}
            >
              My Products
          </Text>
          </View>
          <View
            style={{
              height: "100%",
              width: "90%",
              marginTop: 6,
              marginBottom: "25%"
            }}
          >
            {!props.myProductsLoading && (
              <Fragment>
                {props.myProductsData.map(product => (
                  <Card
                    key={product._id}
                    product={product}
                    navigation={props.navigation}
                  />
                ))}
              </Fragment>
            )}
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    myProductsData: state.myProducts.data,
    myProductsError: state.myProducts.error,
    myProductsLoading: state.myProducts.loading,
    token: state.token
  };
};
const mapDispatchToProps = {
  getMyProducts
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
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
    width: "100%"
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
  flex: {
    justifyContent: "space-between",
    padding: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  flexCard: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  }
});

/*
      <View style={styles.flexCard}>
      <TouchableHighlight          onPress={() =>
        props.navigation.navigate("ProductDetail", {
          id: 'asd'
        })
      }>
        <View style={styles.card}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 450,
                height: 200,
                alignItems: "center",
                justifyContent: "center"
              }}
              source={{
                uri:
                  "https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 10
            }}
          >
            <Text
              style={{ color: "white", fontWeight: "700", marginBottom: 5 }}
            >
              Smoke 24/7
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "400",
                paddingHorizontal: 60
              }}
            >
              Clouds come floating into my life, no longer to carry rain or
              usher storm, but to add color to my sunset sky.
            </Text>
          </View>
        </View>
      </TouchableHighlight>
        <View style={styles.card}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 450,
                height: 200,
                alignItems: "center",
                justifyContent: "center"
              }}
              source={{
                uri:
                  "https://i.ibb.co/CH4jrj5/illustrator4.jpg"
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 10
            }}
          >
            <Text
              style={{ color: "white", fontWeight: "700", marginBottom: 5 }}
            >
              Red Blood
            </Text>
            <Text
              style={{
                color: "black",
                fontWeight: "400",
                paddingHorizontal: 60
              }}
            >
              The bond that links your true family is not one of blood, but of
              respect and joy in each other's life.
            </Text>
          </View>
        </View>
      </View>

*/

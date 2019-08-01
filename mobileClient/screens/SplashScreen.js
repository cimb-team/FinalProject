import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Animated,
  Image,
  Dimensions
} from "react-native";
import { getProfile, setToken } from "../store/action";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

function SplashScreen({ navigation, getProfile, setToken }) {
  // buat ntar loading screen
  const [loading, setLoading] = useState(false);

  function getUserInfo() {
    AsyncStorage.getItem("@NusantaraArt:token")
      .then(token => {
        if (!token) throw "Token is null";
        setToken(token);
        return getProfile();
      })
      .then(data => {
        navigation.navigate("App");
      })
      .catch(err => {
        navigation.navigate("Auth");
      });
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 1500);

  //   setTimeout(() => {
  //     getUserInfo();
  //   }, 100);
  // }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splashScreen.png')} style={{width: width*0.4, height: height*0.1}}/>
      { loading && <ActivityIndicator color='#EE5537' size="large" />}
      <StatusBar barStyle="default" />
    </View>
  );
}

const mapDispatchToProps = {
  getProfile,
  setToken
};

export default connect(
  null,
  mapDispatchToProps
)(SplashScreen);

import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import { getProfile, setToken } from "../store/action";
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function SplashScreen({ navigation, getProfile, setToken }) {
  // buat ntar loading screen

  function getUserInfo() {
    AsyncStorage.getItem('@NusantaraArt:token')
      .then(token => {
        // console.log(token)
        if (!token)
          throw 'Token is null'
        setToken(token)
        return getProfile()
      })
      .then(data => {
        // console.log('then');
        
        navigation.navigate('App');
      })
      .catch(err => {
        // console.log('catch');
        
        navigation.navigate('Auth');
      })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}

const mapDispatchToProps = {
  getProfile,
  setToken
};

export default connect(
  null,
  mapDispatchToProps
)(SplashScreen);
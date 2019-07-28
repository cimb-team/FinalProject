import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Animated,
  Image
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
  const [loading, setLoading] = useState(false)

  function getUserInfo() {
    AsyncStorage.getItem('@NusantaraArt:token')
      .then(token => {
        console.log(token)
        if (!token)
          throw 'Token is null'
        setToken(token)
        return getProfile()
      })
      .then(data => {
        console.log('then');
        
        navigation.navigate('App');
      })
      .catch(err => {
        console.log('catch');
        
        navigation.navigate('Auth');
      })
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000);

    setTimeout(() => {
      getUserInfo()
    }, 3000);
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splashScreen.png')} style={{width: '50%', height: '30%'}}/>
      { loading && <ActivityIndicator size="large" />}
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
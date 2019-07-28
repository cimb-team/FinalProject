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
import axios from '../axios'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SplashScreen({navigation}) {
  // buat ntar loading screen

  function getUserInfo(){
    AsyncStorage.getItem('@NusantaraArt:token')
    .then(token =>{
      console.log(token)
      if(!token)
        throw 'Token is null'
      return axios({
        method: 'get',
        url: '/user',
        headers: {
          token
        }
      })
    })
    .then(({data})=>{
      navigation.navigate('App');
    })
    .catch(err =>{
      navigation.navigate('Auth');
    })
  }

  useEffect(()=>{
    getUserInfo()
  },[])

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}

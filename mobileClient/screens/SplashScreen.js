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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SplashScreen({navigation}) {
  // buat ntar loading screen
  
  // async function getUserInfo(){
  //   const user = await axios({
  //     method: 'get',
  //     url: '/user',
  //     header: localStorage.getItem('token')
  //   })
  //   navigation.navigate(user ? 'App' : 'Auth');
  // }

  // useEffect(()=>{
  //   getUserInfo()
  // },[])

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}

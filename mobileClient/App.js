import React, { useState, useEffect } from 'react';
import { Root } from 'native-base'
import { StyleSheet, View } from 'react-native';
import Navigation from "./navigations/Navigation";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';

export default function App() {
  const [fontLoaded, setfontLoaded] = useState(false)
  
  async function loadAllFont () {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...MaterialIcons.font,
    })
    setfontLoaded(true)
  }

  useEffect(() =>{
    loadAllFont()
  },[])

  return (
    <Root>
      {
        fontLoaded
        ? <Navigation />
        : <AppLoading/>
      }
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
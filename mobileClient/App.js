import React from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from "./navigations/Navigation";
import { AppLoading } from 'expo';

export default function App() {
  return (
    <Navigation />
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
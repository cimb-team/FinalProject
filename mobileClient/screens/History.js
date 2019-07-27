import React, { useState, useEffect } from "react";
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
  TouchableHighlight
} from "react-native";
import Title from "../components/Title";
// import {Permissions, Constants} from 'expo';
import { Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker'
// import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
export default function History(props) {
  const [image, setImage] = useState(false)
  useEffect(() => {
  }, []);

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      
      setImage(result.uri);
      console.log(image)
    }
  };
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        _pickImage()
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Title title="History" style={styles.text} />
      <View style={styles.card}>
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "600",
            marginBottom: 10
          }}
        >
          Status: WIN
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10
            }}
          >
            <Image
              style={{
                width: 150,
                height: 120,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5
              }}
              source={{
                uri: "https://i.ibb.co/CH4jrj5/illustrator4.jpg"
              }}
            />
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "600",
                marginBottom: 10
              }}
            >
              Smoke
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "400",
                marginBottom: 10
              }}
            >
              Abstract
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "400",
                marginBottom: 10
              }}
            >
              24/07/2019
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "400",
                marginBottom: 10
              }}
            >
              $22
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "400",
                marginBottom: 10
              }}
            >
              Bought from Orvin Savero
            </Text>
          </View>
        </View>
      </View>
      <Title title="Top up" style={styles.text} />
      <Title title="Balance: $ 220.5" style={styles.text} />
      <View style={{    marginVertical: 10,
        backgroundColor: "#f5f5f5",
        margin: 10,
        width: "95%",
        borderRadius: 5,
        padding: 10,flexDirection: "row", flexWrap: "wrap" }}>
      <TextInput style={styles.search} />
      <View
      style={{
        padding: 10,
        backgroundColor: "#3399ff",
        width: 100,
        borderRadius: 5,
        marginLeft: 10
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "600",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        Top up
      </Text>
    </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Pick an image from camera roll"
        onPress={getPermissionAsync}
      />
      {image &&
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  text: {
    textAlign: "center",
    margin: 5,
    fontSize: 25,
    fontWeight: "bold"
  },
  search: {
    height: 35,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.5,
    width: 250
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    margin: 10,
    width: "95%",
    borderRadius: 5,
    padding: 10
  }
});


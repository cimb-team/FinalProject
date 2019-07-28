import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Toast,
  Left,
  Body,
  Right,
  Title
} from "native-base";
import FormAuth from "../components/FormAuth.js";
import { AsyncStorage } from "react-native";
import axios from "../axios";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { getProfile } from "../store/action";
import { connect } from "react-redux";

function Signin({ navigation, getProfile }) {
  const [loading, setloading] = useState(false);

  function submitForm(email, password) {
    setloading(true);
    axios({
      method: "post",
      url: "/user/signin",
      data: {
        email,
        password
      }
    })
      .then(({ data }) => {
        return AsyncStorage.setItem("@NusantaraArt:token", data.token);
      })
      .then(result => {
        setloading(false);
        Toast.show({
          text: "Sign in success",
          buttonText: "OK",
          duration: 3000,
          type: "success",
          buttonStyle: { backgroundColor: "green" }
        });
        navigation.navigate("Splash");
      })
      .catch(({ response }) => {
        setloading(false);
        Toast.show({
          text: response.data.message,
          buttonText: "OK",
          duration: 3000,
          type: "danger",
          buttonTextStyle: { color: "#008000" },
          buttonStyle: { backgroundColor: "red" }
        });
      });
  }

  return (
    <Container
      style={{
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
      }}
    >
      <Header>
        <Left />
        <Body>
          <Title>Sign in</Title>
        </Body>
      </Header>
      <Content contentContainerStyle={{ marginHorizontal: 20 }}>
        <FormAuth
          loading={loading}
          submitForm={submitForm}
          navigation={navigation}
          title="Signin"
        />
      </Content>
    </Container>
  );
}

const mapDispatchToProps = {
  getProfile
};

export default connect(
  null,
  mapDispatchToProps
)(Signin);

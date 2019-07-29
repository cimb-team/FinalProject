import React, { useState, useEffect } from "react";

import FormAuth from "../components/FormAuth.js";
import { AsyncStorage } from "react-native";
import axios from "../axios";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { getProfile, setToken } from "../store/action";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Toast,
  H1,
  H2,
  H3,
  Left,
  Body,
  Right,
  Title,
  Label
} from "native-base";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';

function Signin({ navigation, getProfile, setToken }) {
  const [loading, setloading] = useState(false);
  const [opacity, setopacity] = useState(0.2)

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
        setToken(data.token)
        return AsyncStorage.setItem("@NusantaraArt:token", data.token);
      })
      .then(result => {
        setloading(false);
        return getProfile()
        // Toast.show({
        //   text: "Sign in success",
        //   buttonText: "OK",
        //   duration: 3000,
        //   type: 'success',
        //   buttonStyle: { backgroundColor: "green" }
        // })
        
      })
      .then(data => {
        navigation.navigate("App");
      })
      .catch(({ response }) => {
        setloading(false);
        Toast.show({
          style: {
            marginBottom: "11%",
            marginHorizontal: "5%",
            borderRadius: 10,
            backgroundColor: "rgba(236, 232, 232, 0.5)"
          },
          text: response.data.message,
          buttonText: "OK",
          duration: 3000,
          type: "danger",
          textStyle: { color: "black", marginBottom: 20 },
          // buttonTextStyle: { color: "black" },
          buttonStyle: { backgroundColor: "red", marginBottom: 20 }
        });
      });
  }

  return (
    <Container
      style={{
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
      }}
    >
      <NavigationEvents
        onWillBlur={payload => {
          // SignupRef.current.transitionTo({ opacity: 0.2 })
          setopacity(0.2)
          console.log('will blur',payload)
        }}
        onWillFocus={payload => {
          // SignupRef.current.transitionTo({ opacity: 0.2 })
          setopacity(1)
          console.log('will focus',payload)
        }}
      />
              
      <Header transparent noLeft>
      <Animatable.View transition="opacity" style={{ opacity: opacity }} duration={1000}>
        <Body style={{ marginHorizontal: 20 }}>
          <H3>Sign in</H3>
        </Body>
    </Animatable.View>
      </Header>
      <Content contentContainerStyle={{ marginHorizontal: 20 }}>
            <Animatable.View transition="opacity" style={{ opacity: opacity }} duration={1000}>
        <FormAuth
          loading={loading}
          submitForm={submitForm}
          navigation={navigation}
          title="Signin"
        />
    </Animatable.View>
      </Content>
    </Container>
  );
}

const mapDispatchToProps = {
  getProfile,
  setToken
};

export default connect(
  null,
  mapDispatchToProps
)(Signin);

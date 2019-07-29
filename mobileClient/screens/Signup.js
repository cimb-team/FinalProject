import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Icon,
  H1,
  H2,
  H3,
  Text,
  Toast,
  Left,
  Body,
  Right,
  Title,
  Label
} from "native-base";
import FormAuth from "../components/FormAuth";
import axios from "../axios";
import { Platform, AsyncStorage, Image } from "react-native";
import Constants from "expo-constants";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';
import { getProfile, setToken } from '../store/action'
import { connect } from 'react-redux'

function Signup({ navigation, getProfile, setToken }) {
  const [name, setname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [loading, setloading] = useState(false);
  const [opacity, setopacity] = useState(0.2)
  // const SignupRef = useRef(null);

  function submitForm(email, password) {
    setloading(true);
    axios({
      method: "post",
      url: "/user/signup",
      data: {
        name,
        email,
        password,
        phonenumber
      }
    })
      .then(({ data }) => {
        return axios({
          method: "post",
          url: "/user/signin",
          data: {
            email,
            password
          }
        });
      })
      .then(({ data }) => {
        setToken(data.token)
        return AsyncStorage.setItem("@NusantaraArt:token", data.token);
      })
      .then(token => {
        setloading(false);
        // Toast.show({
        //   style: {

        //   },
        //   text: "Sign up success",
        //   buttonText: "OK",
        //   duration: 3000,
        //   type: 'success',
        //   buttonStyle: { backgroundColor: "green" }
        // })
        return getProfile()
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
          <H3>Create New Account</H3>
        </Body>
    </Animatable.View>
      </Header>
      <Content contentContainerStyle={{ marginHorizontal: 20 }}>
            <Animatable.View transition="opacity" style={{ opacity: opacity }} duration={1000}>
        <FormAuth
          loading={loading}
          submitForm={submitForm}
          title="Signup"
          // TopInput={

          // }
          // BottomInput={(props) => (
          //   <Fragment>
          //     <Item>
          //       <Input placeholder="Phone Number" />
          //     </Item>
          //     <Item last>
          //       <Input placeholder="Password" />
          //     </Item>
          //   </Fragment>
          // )}
        >
          <Item stackedLabel>
            <Label>Name</Label>
            <Input value={name} onChangeText={text => setname(text)} />
            {/* <Icon active name='person' /> */}
          </Item>
          <Item stackedLabel>
            <Label>Phone Number</Label>
            <Input
              keyboardType="numeric"
              value={phonenumber}
              onChangeText={text => setphonenumber(text)}
            />
            {/* <Icon active name='call'/> */}
          </Item>
        </FormAuth>
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
)(Signup);

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
import { View, Platform, AsyncStorage, Image,ImageBackground,Dimensions, KeyboardAvoidingView} from "react-native";
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
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");
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
            marginBottom: "95%",
            marginHorizontal: "5%",
            borderRadius: 10,
            backgroundColor: "rgba(236, 232, 232, 0.5)"
          },
          text: response.data.message,
          duration: 3000,
          type: "danger",
          textStyle: { color: "white", marginBottom: 20 },
          // buttonTextStyle: { color: "black" },
          buttonStyle: { backgroundColor: "#EE5537", marginBottom: 20 }
        });
      });
  }

  return (
    <KeyboardAvoidingView style={{marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight}} 
    behavior="position" enabled>
    <ImageBackground blurRadius={0} source={require('../assets/1withlogo.png')} style={{width: width*1, height: height*1,}}>
  
      <NavigationEvents
        onWillBlur={payload => {
          setopacity(0.2)
        }}
        onWillFocus={payload => {
          setopacity(1)
        }}
      />
      <Header transparent noLeft>
      <Animatable.View transition="opacity" style={{ opacity: opacity }} duration={1000}>
       
    </Animatable.View>
      </Header>
      <Content contentContainerStyle={{ marginHorizontal: height*0.05, marginTop:height*0.4 }}>
            <Animatable.View transition="opacity" style={{ opacity: opacity }} duration={1000}>
       <View style={{width:width*0.8}}> 

       
        <FormAuth
          loading={loading}
          submitForm={submitForm}
          title="Signup"
        >
          <Item>
            <Input value={name}
            placeholder="Full Name"
              placeholderTextColor='white'
              style={{color : "white"}}
            onChangeText={text => setname(text)} />
            {/* <Icon active name='person' /> */}
          </Item>
          <Item>
            <Input
              keyboardType="numeric"
              placeholder="Phone Number"
              style={{color : "white"}}
              placeholderTextColor='white'
              value={phonenumber}
              onChangeText={text => setphonenumber(text)}
            />
            {/* <Icon active name='call'/> */}
          </Item>
        </FormAuth>
        </View>
        <View style={{marginTop:height*0.04, justifyContent:"center", alignItems:'center'}}>
          
          <Text style={{fontWeight:'bold',color:'white'}}>Already have an account ? <Text onPress={() => navigation.navigate("SignIn")} style={{fontWeight:'bold',color:'#F3411E'}}> Sing In </Text> </Text>
          </View>
    </Animatable.View>
      </Content>
      </ImageBackground>
    </KeyboardAvoidingView>
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

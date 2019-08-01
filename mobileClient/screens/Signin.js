import React, { useState, useEffect } from "react";

import FormAuth from "../components/FormAuth.js";
import { AsyncStorage,Text,KeyboardAvoidingView } from "react-native";
import axios from "../axios";
import { Platform, ImageBackground, Dimensions, View } from "react-native";
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
  Label,

} from "native-base";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';

function Signin({ navigation, getProfile, setToken }) {
  const [loading, setloading] = useState(false);
  const [opacity, setopacity] = useState(0.2)
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");

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
            marginBottom: "20%",
            marginHorizontal: "5%",
            borderRadius: 10,
            backgroundColor : 'transparent'
          },
          text: response.data.message,
          duration: 3000,
          type: "danger",
          textStyle: { color: "white", marginBottom: 30, textAlign:'center' },
          // buttonTextStyle: { color: "black" },
          buttonStyle: { backgroundColor: "#EE5537", marginBottom: 20 }
        });
      });
  }

  return (
    <KeyboardAvoidingView style={{marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight}} 
    behavior="position" enabled>

    <ImageBackground blurRadius={0} source={require('../assets/2withlogo.png')} style={{width: width*1, height: height*1,}}>
      <NavigationEvents
        onWillBlur={payload => {
          // SignupRef.current.transitionTo({ opacity: 0.2 })
          setopacity(0.2)
        }}
        onWillFocus={payload => {
          // SignupRef.current.transitionTo({ opacity: 0.2 })
          setopacity(1)
        }}
      />
              
      <Header transparent noLeft>
      <Animatable.View transition="opacity" style={{ opacity: opacity }} duration={1000}>
      
    </Animatable.View>
      </Header>
      <Content contentContainerStyle={{ marginHorizontal: height*0.05, marginTop:height*0.5,  }}>
            <Animatable.View transition="opacity" style={{ opacity: opacity }} duration={1000}>
        <View style={{width:width*0.8}}>
        <FormAuth
          loading={loading}
          submitForm={submitForm}
          navigation={navigation}
          title="Signin"
        />
        </View>
        <View style={{marginTop:height*0.04, justifyContent:"center", alignItems:'center'}}>
          
        <Text style={{fontWeight:'bold',color:'white'}}>Don't have an account ? <Text onPress={() => navigation.navigate("SignUp")} style={{fontWeight:'bold',color:'#F3411E'}}> Sign Up </Text> </Text>
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
)(Signin);

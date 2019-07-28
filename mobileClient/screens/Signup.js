import React, { useState, useEffect } from 'react'
import { Container, Header, Content, Form, Item, Input, Icon, H1, H2, H3, Text, Toast, Left, Body, Right, Title, Label } from 'native-base';
import FormAuth from '../components/FormAuth'
import axios from '../axios'
import { Platform, AsyncStorage, Image } from 'react-native'
import Constants from 'expo-constants';

export default function Signup({ navigation }) {
  const [name, setname] = useState('')
  const [phonenumber, setphonenumber] = useState('')
  const [loading, setloading] = useState(false)

  function submitForm(email, password){
    setloading(true)
    axios({
      method: 'post',
      url: '/user/signup',
      data: {
        name,
        email,
        password,
        phonenumber
      }
    })
    .then(({data})=>{
      console.log('then1')
      return axios({
        method: 'post',
        url: '/user/signin',
        data: {
          email,
          password,
        }
      })
      
    })
    .then(({data})=>{
      console.log('then2')
      return AsyncStorage.setItem('@NusantaraArt:token', data.token)
    })
    .then(token => {
      console.log('then3')
      setloading(false)
      // Toast.show({
      //   style: {
          
      //   },
      //   text: "Sign up success",
      //   buttonText: "OK",
      //   duration: 3000,
      //   type: 'success',
      //   buttonStyle: { backgroundColor: "green" }
      // })
      navigation.navigate('App')
    })
    .catch(({response}) =>{
      console.log('catch')
      setloading(false)
      Toast.show({
        style: {
          marginBottom: '11%',
          marginHorizontal: '5%',
          borderRadius: 10,
          backgroundColor: 'rgba(236, 232, 232, 0.5)',
        },
        text: response.data.message,
        buttonText: "OK",
        duration: 3000,
        type: 'danger',
        textStyle: { color: "black", marginBottom: 20 },
        // buttonTextStyle: { color: "black" },
        buttonStyle: { backgroundColor: "red", marginBottom: 20 }
      })
    })
  }

  return (
    <Container style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight, }}>
      <Header transparent noLeft>
        <Body style={{ marginHorizontal: 20 }}>
          <H3>Create New Account</H3>
        </Body>
      </Header>
      <Content contentContainerStyle={{ marginHorizontal: 20 }}>
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
            <Input value={name} onChangeText={(text) => setname(text)}/>
            {/* <Icon active name='person' /> */}
          </Item>
          <Item stackedLabel>
            <Label>Phone Number</Label>
            <Input keyboardType="numeric" value={phonenumber} onChangeText={(text) => setphonenumber(text)}/>
            {/* <Icon active name='call'/> */}
          </Item>
        </FormAuth>
      </Content>
    </Container>
  )
}

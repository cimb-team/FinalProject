import React, { useState, useEffect } from 'react'
import { Container, Header, Content, Form, Item, Input, Icon, Toast, Left, Body, Right, Title } from 'native-base';
import FormAuth from '../components/FormAuth'
import axios from '../axios'
import { Platform } from 'react-native'
import Constants from 'expo-constants';

export default function Auth({ navigation }) {
  const [name, setname] = useState('')
  const [phonenumber, setphonenumber] = useState('')
  const [loading, setloading] = useState(false)

  function submitForm(email, password){
    setloading(true)
    axios({
      method: 'post',
      url: '/signup',
      data: {
        name,
        email,
        password,
        phonenumber
      }
    })
    .then(({data})=>{
      setloading(false)
      Toast.show({
        text: "Sign up success",
        buttonText: "OK",
        duration: 3000,
        type: 'success',
        buttonStyle: { backgroundColor: "green" }
      })
      navigation.navigate('Signin')
    })
    .catch(({response}) =>{
      console.log(response.data.message)
      setloading(false)
      Toast.show({
        text: response.data.message,
        buttonText: "OK",
        duration: 3000,
        type: 'danger',
        buttonTextStyle: { color: "#008000" },
        buttonStyle: { backgroundColor: "red" }
      })
    })
  }

  return (
    <Container style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight, }}>
      <Header>
        <Left/>
        <Body>
          <Title>Create New Account</Title>
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
          <Item>
            <Icon active name='person' />
            <Input value={name} onChangeText={(text) => setname(text)} placeholder='Name' />
          </Item>
          <Item last>
            <Icon active name='call' />
            <Input value={phonenumber} onChangeText={(text) => setphonenumber(text)} placeholder='Phone Number' />
          </Item>
        </FormAuth>
      </Content>
    </Container>
  )
}

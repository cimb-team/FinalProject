import React from 'react'
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import FormAuth from '../components/FormAuth.js'

export default function Auth({ navigation }) {
  return (
    <Container>
      <Header />
      <Content>
        <FormAuth
          navigation={navigation}
          title="Signin"
        >
        </FormAuth>
      </Content>
    </Container>
  )
}

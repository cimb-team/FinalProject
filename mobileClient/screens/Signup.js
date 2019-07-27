import React, { Fragment } from 'react'
import { Container, Header, Content, Form, Item, Input, Icon } from 'native-base';
import FormAuth from '../components/FormAuth'

export default function Auth({ navigation }) {
  return (
    <Container>
      <Header />
      <Content contentContainerStyle={{ marginHorizontal: 20 }}>
        <FormAuth
          navigation={navigation}
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
            <Input secureTextEntry placeholder='Name' />
          </Item>
          <Item last>
            <Icon active name='call' />
            <Input secureTextEntry placeholder='Phone Number' />
          </Item>
        </FormAuth>
      </Content>
    </Container>
  )
}

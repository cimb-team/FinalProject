import React from 'react'
import { Container, Header, Content, Form, Item, Input, Button, Text, Icon } from 'native-base';

export default function FormAuth({ title, children, navigation }) {
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          {children}
          <Item>
            <Icon active name='mail' />
            <Input placeholder='Email' />
          </Item>
          <Item>
            <Icon active name='lock' />
            <Input secureTextEntry placeholder='Password' />
          </Item>
          <Button onPress={() => navigation.navigate('App')} block danger>
            <Text>
              {title}
            </Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

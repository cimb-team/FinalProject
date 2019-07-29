import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon,
  Spinner,
  Label
} from "native-base";

export default function FormAuth({ title, children, submitForm, loading }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <Form>
      {children}
      <Item>
        {/* <Icon active name='mail' /> */}
        <Input value={email} 
        placeholder="Email"
        placeholderTextColor='white'
        style={{color : "white"}}
        onChangeText={text => setemail(text)} />
      </Item>
      <Item>
        {/* <Icon active name='lock' /> */}
        <Input
          value={password}
          placeholder="Password"
          placeholderTextColor='white'
          style={{color : "white"}}
          onChangeText={text => setpassword(text)}
          secureTextEntry
        />
      </Item>
      <Button
        onPress={() => submitForm(email, password)}
        block
        rounded
        
        disabled={loading}
        style={{ marginTop: 30, backgroundColor:'#EE5537' }}
      >
        {!loading ? <Text>{title}</Text> : <Spinner />}
      </Button>
    </Form>
  );
}

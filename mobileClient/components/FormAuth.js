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
  Spinner
} from "native-base";

export default function FormAuth({ title, children, submitForm, loading }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <Form style={{ marginTop: 40 }}>
      {children}
      <Item>
        <Icon active name="mail" />
        <Input
          keyboardType="email-address"
          value={email}
          onChangeText={text => setemail(text)}
          placeholder="Email"
        />
      </Item>
      <Item>
        <Icon active name="lock" />
        <Input
          keyboardType="default"
          value={password}
          onChangeText={text => setpassword(text)}
          secureTextEntry
          placeholder="Password"
        />
      </Item>
      <Button
        onPress={() => submitForm(email, password)}
        block
        danger
        disabled={loading}
        style={{ marginTop: 30 }}
      >
        {!loading ? <Text>{title}</Text> : <Spinner />}
      </Button>
    </Form>
  );
}

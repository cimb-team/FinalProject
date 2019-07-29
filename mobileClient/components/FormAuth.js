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
      <Item stackedLabel>
        <Label>Email</Label>
        {/* <Icon active name='mail' /> */}
        <Input value={email} onChangeText={text => setemail(text)} />
      </Item>
      <Item stackedLabel>
        <Label>Password</Label>
        {/* <Icon active name='lock' /> */}
        <Input
          value={password}
          onChangeText={text => setpassword(text)}
          secureTextEntry
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

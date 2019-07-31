import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import { Spinner, Button } from 'native-base'
import { connect } from "react-redux";
import { getProfile, toppingUp } from "../store/action";
import Title from "../components/Title";
import { NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import formatCash from "../helpers";

function Topup(props) {
  [topup, setTopup] = useState("0");
  [loading, setloading] = useState(false);

  handleChange = text => {
    setTopup(String(Number(text.replace(/[^0-9]+/g, ''))));
  };
  postTopup = () => {
    setloading(true)
    props.toppingUp(topup, props.token)
    .then(data =>{
      setloading(false)
    })
    .catch(err =>{
      setloading(false)
    })
    setTopup("0");
  };
  useEffect(() => {
    props.getProfile(props.token);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Top up" style={styles.text} />

      {!props.profileLoading
      ? (
        <Title
          title={`Balance: ${formatCash(props.profileData.balance)}`}
          style={styles.text}
        />)
      : <Spinner/>}
      <View
        style={{
          marginVertical: 10,
          backgroundColor: "#f5f5f5",
          margin: 10,
          width: "95%",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        <TextInput
          keyboardType="numeric"
          style={styles.search}
          onChangeText={handleChange}
          value={topup}
        />
        
        {/* <TouchableHighlight onPress={postTopup} disabled={loading}>
          <View
            style={{
              padding: 10,
              backgroundColor: "#3399ff",
              width: 100,
              borderRadius: 10,
              marginLeft: 10
            }}
          >
            {!loading ? (
              <Text
              style={{
                color: "white",
                fontWeight: "600",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              Top up
            </Text>
            ) : (
              <Spinner />
            )}
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              Top up
            </Text>
          </View>
        </TouchableHighlight> */}
      </View>
      <Button
          onPress={postTopup}
          block
          primary
          disabled={loading}
          style={{ marginTop: 20, marginHorizontal: '2.5%' }}
        >
          {!loading ? <Text>Top up</Text> : <Spinner />}
        </Button>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    profileData: state.profile.data,
    profileError: state.profile.error,
    profileLoading: state.profile.loading,
    token: state.token
  };
};
const mapDispatchToProps = {
  getProfile,
  toppingUp
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    textAlign: "center",
    margin: 5,
    fontSize: 25,
    fontWeight: "bold"
  },
  search: {
    height: 35,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.5,
    width: '100%'
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    margin: 10,
    width: "95%",
    borderRadius: 10,
    padding: 10
  }
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { getProfile, toppingUp } from "../store/action";
import Title from "../components/Title";
function Topup(props) {
  [topup, setTopup] = useState("");
  handleChange = e => {
    setTopup(e);
  }; 
  postTopup = () => {
    props.toppingUp(topup, props.token);
    setTopup("");
  };
  useEffect(() => {
    props.getProfile(props.token);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Top up" style={styles.text} />

      {!props.profileLoading && (
        <>
          <Title
            title={`Balance: $ ${props.profileData.balance}`}
            style={styles.text}
          />
        </>
      )}
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
          style={styles.search}
          onChangeText={handleChange}
          value={topup}
        />
        <TouchableHighlight onPress={() => postTopup()}>
          <View
            style={{
              padding: 10,
              backgroundColor: "#3399ff",
              width: 100,
              borderRadius: 10,
              marginLeft: 10
            }}
          >
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
        </TouchableHighlight>
      </View>
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
    backgroundColor: "black"
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
    width: 250
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

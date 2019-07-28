import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  ListItem,
  Left,
  List,
  Body,
  Right
} from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { getProfile } from "../store/action";
const { width } = Dimensions.get("window");
const height = width * 0.6;

function logout(){
  AsyncStorage.clear()
    .then(() => this.props.navigation.navigate('Signin'))
    .catch(err => console.log(err))
}

function ProfilePage(props) {
  useEffect(() => {
    props.getProfile(props.token);
  }, []);

  // console.log(props.profileData)
  return (
    <View style={styles.container}>
      <View
        style={{
          height: "50%",
          width: "100%",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

      {props.profileLoading && (
        <Image
          style={{ width: 200, height: 200, borderRadius: 100 }}
          source={{
            uri:
              "https://thumbs.gfycat.com/UnitedSmartBinturong-max-1mb.gif"
          }}
        />
      )}
        {!props.profileLoading && (
          <Image
            style={{ width: 200, height: 200, borderRadius: 100 }}
            source={{
              uri:
                props.profileData.image
            }}
          />
        )}

        {!props.profileLoading && (
          <>
        <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 20 }}>
          {props.profileData.name}
        </Text>
        <Text style={{ fontSize: 15, marginTop: 5 }}> Artist</Text>
        </>
        )}
      </View>

      <View
        style={{
          width: "95%",
          height: 250,
          backgroundColor: "white",
          marginTop: 15
        }}
      >
          <Button onPress={logout} block danger>
            <Text>
              Logout
            </Text>
          </Button>
        <Card>
          <CardItem>
            <Body>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Balance</Text>
              {!props.profileLoading && (
                <>
              <Text style={{ fontSize: 14 }}>Rp. {props.profileData.balance}</Text>
              </>
              )}
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Body>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Email</Text>
              {!props.profileLoading && (
                <>
              <Text style={{ fontSize: 14 }}>{props.profileData.email}</Text>
              </>
              )}
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Body>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Phone Number
              </Text>
              {!props.profileLoading && (
                <>
              <Text style={{ fontSize: 14 }}>{props.profileData.phonenumber}</Text>
              </>
              )}
            </Body>
          </CardItem>
        </Card>
      </View>

      <View
        style={{
          width: "95%",
          height: 90,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >


        <View
          style={{
            width: "45%",
            height: "90%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
          }}
        >

          <Card style={{ width: "100%" }}>
          <TouchableHighlight
          onPress={() =>
            props.navigation.navigate("History", {
              id: 'sdf'
            })
          }
        >
            <CardItem>

              <Body style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome name="history" size={45} color="black" />
                <Text style={{ fontSize: 10 }}>Bid History</Text>
              </Body>
          
            </CardItem>
            </TouchableHighlight>
          </Card>

        </View>

        <View
          style={{
            width: "45%",
            height: "90%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
      
          <Card style={{ width: "100%" }}>
          <TouchableHighlight
          onPress={() =>
            props.navigation.navigate("Topup", {
              id: 'sdf'
            })
          }
        >
            <CardItem>
              <Body style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome name="money" size={45} color="black" />
                <Text style={{ fontSize: 10 }}>TopUp Balance</Text>
              </Body>
            </CardItem>
            </TouchableHighlight>
          </Card>
        </View>
      </View>
    </View>
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
  getProfile
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    backgroundColor: 'white'
  },
  scrollContainer: {
    height: "34.5%",
    width: "100%",
    backgroundColor: "red"
  },
  image: {
    width,
    height
  }
});

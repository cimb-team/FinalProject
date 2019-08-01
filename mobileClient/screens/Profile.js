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
  AsyncStorage
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
import { NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import formatCash from "../helpers";
const { width } = Dimensions.get("window");
const height = width * 0.6;

function ProfilePage(props) {
  // useEffect(() => {
  //   props.getProfile(props.token);
  // }, []);

  function logout() {
    AsyncStorage.clear()
      .then(() => props.navigation.navigate("SignIn"))
      .catch(err => console.log(err));
  }

  const handleViewRef = ref => (this.view = ref);
  const animation = () => this.view.fadeInUp(800);

  return (
    <Animatable.View ref={handleViewRef} style={styles.container}>
      <NavigationEvents onWillBlur={animation} onWillFocus={() => {
        animation()
        props.getProfile(props.token);
      }} />
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            height: 300,
            width: "100%",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          
          {!props.profileLoading && (
            <Image
              style={{ width: 200, height: 200, borderRadius: 100 }}
              source={require('../assets/avatar.png')} 
            />
          )}  
        </View>

        <View
          style={{
            width: "95%",
            heigh:700,
            marginTop: 15
          }}
        >
          <Button onPress={logout} block rounded style={{backgroundColor:'#EE5537'}}>
            <Text style={{color:'white'}}>Logout</Text>
          </Button>
          <Card >
            <CardItem>
              <Body>
                <Text style={{ fontWeight: "bold", fontSize: 20, color:'#EE5537' }}>
                  Balance
                </Text>
                {!props.profileLoading && (
                  <>
                    <Text style={{ fontSize: 14, color:'#EE5537' }}>
                      {formatCash(Number(props.profileData.balance))}
                    </Text>
                  </>
                )}
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <Text style={{ fontWeight: "bold", fontSize: 20, color:'#EE5537' }}>Email</Text>
                {!props.profileLoading && (
                  <>
                    <Text style={{ fontSize: 14, color:'#EE5537' }}>
                      {props.profileData.email}
                    </Text>
                  </>
                )}
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <Text style={{ fontWeight: "bold", fontSize: 20, color:'#EE5537' }}>
                  Phone Number
                </Text>
                {!props.profileLoading && (
                  <>
                    <Text style={{ fontSize: 14, color:'#EE5537' }}>
                      {props.profileData.phonenumber}
                    </Text>
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
                    id: "sdf"
                  })
                }
              >
                <CardItem>
                  <Body
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <FontAwesome name="history" size={45} color="#EE5537" />
                    <Text style={{ fontSize: 10, color:'#EE5537' }}>Bid History</Text>
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
                    id: "sdf"
                  })
                }
              >
                <CardItem>
                  <Body
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <FontAwesome name="money" size={45} color="#EE5537" />
                    <Text style={{ fontSize: 10, color:'#EE5537' }}>TopUp Balance</Text>
                  </Body>
                </CardItem>
              </TouchableHighlight>
            </Card>
          </View>
        </View>
      </ScrollView>
    </Animatable.View>
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
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  scrollContainer: {
    height: "34.5%",
    width: "100%",
  },
  image: {
    width,
    height
  }
});

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  Text,
  View,
  TextInput,
  Image,
  Platform,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';

function TopBar(props) {
  const [filter, setFilter] = useState("");
  useEffect(() => {
  }, []);
  return (
    <View style={styles.flex} opacity={1}>
    
    <View style={styles.searchSection}>
    <Icon style={styles.searchIcon} name="ios-search" size={20} color="red"/>
        <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={e => {setFilter(e)}}
          onSubmitEditing={e => {
            if (
              props.navigation.state.routeName == "MyProduct" &&
              filter !== ""
            ) {
              props.navigation.navigate("FilterMyproduct", {
                search: filter
              });
            }
            if (props.navigation.state.routeName == "Products" && filter !== "") {
              props.navigation.navigate("FilterProduct", {
                search: filter
              });
            }
          }}
        />
    </View>
      {props.navigation.state.routeName === "MyProduct" && 
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate("Create");
        }}
      >
        <Ionicons name="ios-add-circle" color="#EE5537" size={28} />
      </TouchableHighlight>
      }
      <TouchableHighlight
        onPress={() =>
          props.navigation.navigate("History", {
            id: "sdf"
          })
        }
      >
      <Ionicons name="ios-albums" color="#EE5537" size={28} /></TouchableHighlight>
      
    </View>
  );
}

const mapStateToProps = state => {
  return {
    myProductsData: state.myProducts.data,
    token: state.token
  };
};
export default connect(
  mapStateToProps,
  null
)(TopBar);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    textAlign: "center",
    margin: 5,
    fontSize: 25,
    fontWeight: "bold"
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width:'80%'
  },
  searchIcon: {
    paddingRight: 10,
    paddingLeft: 10,
      color : '#EE5537'
  },
  input: {
      flex: 1,
      paddingRight: 10,
      paddingLeft: 0,
      backgroundColor: '#FFF',
      color: '#424242',
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    margin: 10,
    width: "100%"
  },
  search: {
    height: 35,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.5,
    width: '80%'
  },
  flex: {
    justifyContent: "space-around",
    padding: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  flexCard: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  }
});










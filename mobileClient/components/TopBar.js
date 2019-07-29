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

function TopBar(props) {
  const [filter, setFilter] = useState("");
  useEffect(() => {}, []);
  return (
    <View style={styles.flex} opacity={1}>
      <TextInput
        style={styles.search}
        onChangeText={e => {
          setFilter(e);
        }}
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
      <TouchableHighlight
        onPress={() =>
          props.navigation.navigate("Create", {
            id: "sdf"
          })
        }
      >
        <Ionicons name="ios-add-circle" color="black" size={28} />
      </TouchableHighlight>
      <Ionicons name="ios-albums" color="black" size={28} />
      <Ionicons name="ios-person" color="black" size={28} />
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
    width: 250
  },
  flex: {
    justifyContent: "space-between",
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

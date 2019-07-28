import React, { useState, useEffect, Fragment } from "react";
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
import Title from "../components/Title";
import { getHistory } from "../store/action"
function History(props) {
  useEffect(() => {
    props.getHistory(props.token);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Title title="History" style={styles.text} />
      {!props.allProductsLoading && (
        <Fragment>
          {props.historyData.map((history, index) => (
            <View key={index} style={styles.card}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "600",
                marginBottom: 10
              }}
            >
              Status: {history.bids[history.bids.length-1].price}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10
                }}
              >
                <Image
                  style={{
                    width: 150,
                    height: 120,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10
                  }}
                  source={{
                    uri: "https://i.ibb.co/CH4jrj5/illustrator4.jpg"
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "600",
                    marginBottom: 10
                  }}
                >
                    {history._id}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "400",
                    marginBottom: 10
                  }}
                >
                {history.productId}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "400",
                    marginBottom: 10
                  }}
                >
                {history.createdId}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "400",
                    marginBottom: 10
                  }}
                >
                {history.winnerId}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "400",
                    marginBottom: 10
                  }}
                >
                {history.updatedAt}
                </Text>
              </View>
            </View>
          </View>
    
    
      
          ))}
        </Fragment>
      )}
  </SafeAreaView>
  );
}
const mapStateToProps = state => {
  return {
    historyData: state.history.data,
    historyError: state.history.error,
    historyLoading: state.history.loading,
    token: state.token
  };
};
const mapDispatchToProps = {
  getHistory
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);

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

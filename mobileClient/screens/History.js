import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { getHistory } from "../store/action";

function formatCash(num) {
  var p = num.toFixed(2).split(".");
  return (
    "Rp" +
    p[0]
      .split("")
      .reverse()
      .reduce(function(acc, num, i, orig) {
        return num == "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
      }, "") +
    "," +
    p[1]
  );
}

function History(props) {
  useEffect(() => {
    props.getHistory(props.token);
    console.log(props.historyData.bids);
  }, []);

  const handleViewRef = ref => (this.view = ref);
  const animation = () => this.view.fadeInUp(300);

  return (
    <SafeAreaView style={styles.container}>
      {!props.allProductsLoading && (
        <ScrollView>
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
                Status:{" "}
                {props.historyData.winnerId
                  ? props.historyData.winnerId._id == props.profileData._id
                    ? "You Win"
                    : "You lose"
                  : "Bid is still on going"}
              </Text>
              <View style={{ flexWrap: "wrap" }}>
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
                      uri: history.productId.images[0]
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontWeight: "600",
                      marginVertical: 10
                    }}
                  >
                    {history.productId.title}
                  </Text>
                  <Text>
                    {String(history.productId.details).substr(0, 200) + "..."}
                  </Text>
                  {history.bids.map(b => {
                    return (
                      b.bidderId === props.profileData._id && (
                        <>
                          <View
                            style={{ flexDirection: "row", marginVertical: 5 }}
                          >
                            <Text>Placed Bid</Text>
                            <Text>{formatCash(b.price)}</Text>
                          </View>
                          <View
                            style={{ flexDirection: "row", marginVertical: 5 }}
                          >
                            <Text>At</Text>
                            <Text>{new Date(b.dateIssued).toDateString()}</Text>
                          </View>
                        </>
                      )
                    );
                  })}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const mapStateToProps = state => {
  return {
    historyData: state.history.data,
    historyError: state.history.error,
    historyLoading: state.history.loading,
    profileData: state.profile.data,
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

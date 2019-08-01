import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Modal,
  WebView,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { getHistory } from "../store/action";
import formatCash from "../helpers";
function History(props) {
  useEffect(() => {
    props.getHistory(props.token);
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const handleViewRef = ref => (this.view = ref);
  const animation = () => this.view.fadeInUp(300);
  return (
    <SafeAreaView style={styles.container}>
      {!props.historyLoading && (
        <ScrollView>
          {props.historyData.map((bid, index) => (
            <View key={bid._id + "-bid"} style={styles.card}>
                <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontWeight: "600",
                  marginBottom: 10
                }}
              >
                Status: {" "}
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
                  <TouchableHighlight onPress={()=> props.navigation.navigate('ProductDetail', {
                    id: bid.productId._id
                  })}>
                  <Image
                    style={{
                      width: 150,
                      height: 120,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10
                    }}
                    source={{
                      uri: bid.productId.images[0]
                    }}
                  />
                  </TouchableHighlight>
                </View>
                <View
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{margin: 5,fontWeight: '600'}}>{bid.productId.title}</Text>
                <Text style={{margin: 5}}>Initial Price: {formatCash(Number(bid.productId.initialPrice))}</Text>
                {bid.bids && (
                  <Text style={{margin: 5}}>Last Price: {formatCash(Number(bid.bids[bid.bids.length - 1].price))}</Text>
                )}
                <Text style={{margin: 5}}>Status: {bid.productId.status}
                </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      {props.allProductsError && (
        <ScrollView style>
          <Text>Sorry, error occured. Please try again later.</Text>
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
    backgroundColor: "white"
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
    padding: 10,
    borderWidth: 1,
    borderColor: "#EE5537"
  }
});
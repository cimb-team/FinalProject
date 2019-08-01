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
    console.log(props.historyData.bids);
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const handleViewRef = ref => (this.view = ref);
  const animation = () => this.view.fadeInUp(300);
  return (
    <SafeAreaView style={styles.container}>
      {!props.historyLoading && (
        <ScrollView>
          {/* {props.historyData.map((history, index) => (
            <View key={history._id + "history"} style={styles.card}>
                {historya.status == 'close' &&(<> {if (history.winnerId == props.profileData._id){
                  <Text>Status: You lose</Text>()
                })} </>)}
                {history.status == 'open' &&  (<Text>Status: Auction is still on going</Text>)}
           

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
                <View
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{margin: 5,fontWeight: 600}}>{history.productId.title}</Text>
                <Text style={{margin: 5}}>Initial Price: {formatCash(Number(history.productId.initialPrice))}</Text>
                {history.bids && (
                  <Text style={{margin: 5}}>Last Price: {formatCash(Number(history.bids[history.bids.length - 1].price))}</Text>
                )}
                <Text style={{margin: 5}}>Status: {history.productId.status}
                </Text>
                </View>
              </View>
            </View>
          ))} */}
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

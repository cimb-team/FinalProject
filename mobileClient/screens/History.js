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
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22 }}>
              <WebView
                originWhitelist={["*"]}
                source={{ html: "<h1>Hello world</h1>" }}
              />
              <View>
                <TouchableHighlight
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontWeight: "600",
                      marginBottom: 10
                    }}
                  >
                    Hide Modal
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          {props.historyData.map((history, index) => (
            <View key={history._id + "history"} style={styles.card}>
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
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text>Show Modal</Text>
              </TouchableHighlight>
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
                  {history.bids.map((b, index) => {
                    return (
                      b.bidderId === props.profileData._id && (
                        <View
                          key={
                            "biddetail" +
                            props.bidderId +
                            JSON.stringify(b.dateIssued) +
                            index
                          }
                        >
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
                        </View>
                      )
                    );
                  })}
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
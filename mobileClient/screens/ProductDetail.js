import React, { Fragment, useState, useEffect } from "react";
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
import { getProductDetail, bidding } from "../store/action";
import Title from "../components/Title";
import dbh from '../FBConfig'
function ProductDetail(props) {
  const [bid, setbid] = useState("");
  const [bidDariFirebase, setbidDariFirebase] = useState("")
  handleChange = e => {
    setbid(e);
  };
  postbid = () => {
    let arr1 = bidDariFirebase.bids
    arr1.unshift({
      "bidderId": props.bidderId,
      "dateIssued": new Date(),
      "price": bid,
    })
    dbh.collection("biding").doc(`${props.productDetailData.bid._id}`).set({
      bids: arr1,
      createdAt: props.productDetailData.bid.createdAt,
      productId: props.productDetailData.bid.productId,
      updatedAt: props.productDetailData.bid.updatedAt,
      winnerId: props.productDetailData.bid.winnerId,
    }).then( ()=>{
      props.bidding(bid, props.token, props.productDetailData._id);
    })
    setbid("");
  };
  useEffect(() => {

    if (props.productDetailData._id != props.navigation.state.params.id) {
      console.log(props.navigation.state.params.id, '++++++++++++++++++++++++++++')
      props.getProductDetail(props.token, props.navigation.state.params.id);
    }

   else  if (props.ProductDetailfunction) {
      dbh.collection("biding").doc(`${ props.productDetailData.bid._id}`).onSnapshot(function (doc) {
        console.log("XXXXX", 
        doc.data(), '====')
        setbidDariFirebase(doc.data())

      });
    } else {
      console.log(props.navigation.state.params.id, '++++++++++++++++++++++++++++')
      props.getProductDetail(props.token, props.navigation.state.params.id);
    }




  }, [props.ProductDetailfunction]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {!props.productDetailLoading && (
          <Fragment>
            <View style={styles.card}>
              <View
                style={{
                  marginVertical: 10,
                  borderRadius: 10
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: "bold",
                    color: "black",
                    marginBottom: 10
                  }}
                >
                  {props.productDetailData.title}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "400",
                    marginBottom: 10
                  }}
                >
                  {props.productDetailData.category}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{
                    width: "90%",
                    height: 200,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10
                  }}
                  source={{
                    uri: props.productDetailData.images[0]
                  }}
                />
              </View>
              <View style={{ padding: 15 }}>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "600",
                    textAlign: "center",
                    marginHorizontal: 15
                  }}
                >
                  Details
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "400",
                    textAlign: "justify",
                    margin: 15
                  }}
                >
                  {props.productDetailData.details}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  width: 412,
                  marginVertical: 20
                }}
              >
                <TextInput
                  style={styles.search}
                  placeholder="$"
                  onChangeText={handleChange}
                  value={bid}
                />
                <TouchableHighlight onPress={() => postbid()}>
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
                      BID
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  padding: 10,
                  backgroundColor: "#f5f5f5",
                  width: 200,
                  borderRadius: 10,
                  marginTop: 10,
                  marginBottom: 2.5
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "600",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                  }}
                >
                  Initial Price: ${props.productDetailData.initialPrice}
                </Text>
              </View>



              {bidDariFirebase.bids && (
                <>
                  {bidDariFirebase.bids.map((bid, index) => (
                    <View
                      key={index}
                      style={{
                        padding: 10,
                        backgroundColor: "#f5f5f5",
                        width: 200,
                        borderRadius: 10,
                        margin: 2.5
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "400",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center"
                        }}
                      >
                        Bid {index + 1}: ${bid.price}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </Fragment>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    productDetailData: state.productDetail.data,
    productDetailError: state.productDetail.error,
    productDetailLoading: state.productDetail.loading,
    ProductDetailfunction: state.productDetail.function,
    token: state.token,
    bidderId: state.profile.data._id
  };
};
const mapDispatchToProps = {
  getProductDetail,
  bidding
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
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
    width: "95%",
    borderRadius: 10
  },
  search: {
    height: 35,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.5,
    width: 150
  }
});

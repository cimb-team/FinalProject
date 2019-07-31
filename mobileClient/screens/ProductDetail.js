import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView
} from "react-native";
import { Button, Text, Spinner } from 'native-base'
import { connect } from "react-redux";
import { getProductDetail, bidding, quickbid } from "../store/action";
import Title from "../components/Title";
import dbh from "../FBConfig";
import { NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import formatCash from "../helpers";
import moment from 'moment'
import momentDurationFormatSetup from "moment-duration-format"

momentDurationFormatSetup(moment);
// import 'moment-round'

// var mili = new Date()
// mili.setSeconds(mili.getSeconds()+10)

function ProductDetail(props) {
  const [bid, setbid] = useState("0");
  const [bidDariFirebase, setbidDariFirebase] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [countdownText, setcountdownText] = useState("");
  const [bidClosed, setbidClosed] = useState(true)
  const [loadingClosedDate, setloadingClosedDate] = useState(true)

  useEffect(() => {
    if (props.productDetailData.status === 'open')
      setbidClosed(false)

    if (props.productDetailData.closedDate) {
      const interval = setInterval(() => {
        // let closedDate = moment(mili)
        let closedDate = moment(props.productDetailData.closedDate)
        let now = moment()
        let countdown = moment.duration(closedDate.diff(now))

        if (closedDate.diff(now) <= 0) {
          setbidClosed(true)
          setcountdownText(closedDate.calendar(null, {
            sameDay: () => '[' + now.to(closedDate) + ']',
            sameElse: () => '[' + now.to(closedDate) + ']'
          }))
          clearInterval(interval)
        }
        else {
          setcountdownText(closedDate.calendar(null, {
            sameDay: () => '[' + countdown.format() + ']',
            // sameDay: () => '[' + moment.duration(closedDate.diff(now)).format('HH:mm:ss.SSS') + ']',
            sameElse: () => '[' + now.to(closedDate) + ']'
          }))
        }
        setloadingClosedDate(false)
      }, 1000)
    }
  }, [props.productDetailData])

  handleChange = text => {
    setbid(String(Number(text.replace(/[^0-9]+/g, ''))));
  };
  postbid = () => {
    let isLargerThan = false;
    if (bid > props.productDetailData.initialPrice) {
      if (bidDariFirebase) {
        if (bidDariFirebase.bids.length > 0) {
          if (bid > bidDariFirebase.bids[0].price) {
            isLargerThan = true;
          }
        } else {
          isLargerThan = true;
        }
      }
    }

    if (isLargerThan) {
      if (bid <= props.currentBalance) {
        let arr1 = bidDariFirebase.bids;
        arr1.unshift({
          bidderId: props.bidderId,
          dateIssued: new Date(),
          price: bid
        });
        dbh
          .collection("biding")
          .doc(`${props.productDetailData.bid._id}`)
          .set({
            bids: arr1,
            createdAt: props.productDetailData.bid.createdAt,
            productId: props.productDetailData.bid.productId,
            updatedAt: props.productDetailData.bid.updatedAt,
            winnerId: props.productDetailData.bid.winnerId
          })
          .then(() => {
            props.bidding(bid, props.token, props.productDetailData._id);
          });
        setbid("");
      } else {
        setWarningMessage("Saldo Anda tidak mencukupi! Harap lakukan Top Up!");
      }
    } else {
      setWarningMessage(
        "Penawaran harus lebih besar dari yang terbesar dan harga awal!"
      );
    }
  };
  useEffect(() => {
    if (props.productDetailData._id != props.navigation.state.params.id) {
      props.getProductDetail(props.token, props.navigation.state.params.id);
    } else if (props.ProductDetailfunction) {
      dbh
        .collection("biding")
        .doc(`${props.productDetailData.bid._id}`)
        .onSnapshot(function (doc) {
          setbidDariFirebase(doc.data());
        });
    } else {
      props.getProductDetail(props.token, props.navigation.state.params.id);
    }
  }, [props.ProductDetailfunction]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "android" ? "position" : null}
      keyboardVerticalOffset={330}>
      <ScrollView>
        {!props.productDetailLoading && props.productDetailData && (
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
                    textAlign: "right",
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
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "600"
                  }}
                >
                  Artist
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "400"
                  }}
                >
                  {props.productDetailData.userId.name}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "600"
                  }}
                >
                  Auction closed at :
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "400"
                  }}
                >
                  {new Date(
                    String(props.productDetailData.closedDate).split("T")[0]
                  ).toDateString() + " at 00.00"}
                </Text>
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
              <Text>{warningMessage}</Text>
              {!loadingClosedDate
                ? <Text>
                  {countdownText}
                </Text>
                : <Spinner />}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  width: 412,
                  marginVertical: 20
                }}
              >
                {!bidClosed
                  ? (props.productDetailData.userId._id !== props.bidderId ? (
                    <>
                      <TextInput
                        keyboardType="numeric"
                        style={styles.search}
                        placeholder="Place your bid"
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
                    </>
                  )
                    : (<Button onPress={props.quickbid}>
                      <Text>
                        QUICK BID
                  </Text>
                    </Button>)
                  )
                  : (<Button block disabled>
                    <Text>BID CLOSED</Text>
                  </Button>)
                }
                {/* {props.productDetailData.userId._id !== props.bidderId && (
                  !bidClosed
                    ?
                    <>
                      <TextInput
                        keyboardType="numeric"
                        style={styles.search}
                        placeholder="Place your bid"
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
                    </>
                    : (
                      <Button block disabled>
                        <Text>BID CLOSED</Text>
                      </Button>
                    )
                )
                } */}
              </View>
              <View />
              <View>
                <Text>Current Balance : </Text>
                <Text>{formatCash(Number(props.currentBalance))}</Text>
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
                  Initial Price:{" "}
                  {formatCash(props.productDetailData.initialPrice)}
                </Text>
              </View>

              {bidDariFirebase.bids && (
                <>
                  {bidDariFirebase.bids.map((bid, index) => (
                    <Fragment key={index + "fragment"}>
                      {index === 0 && (
                        <View>
                          <Text>Top 5 Bids</Text>
                        </View>
                      )}
                      {index < 5 ? (
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
                            # {index + 1}: ${formatCash(Number(bid.price))}
                          </Text>
                          <Text
                            style={{
                              color: "black",
                              fontWeight: "400",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center"
                            }}
                          >
                            {props.bidderId === bid.bidderId
                              ? "You"
                              : "Other user"}
                          </Text>
                        </View>
                      ) : (
                          <>
                            {index === 5 && <Text>Other bids ..</Text>}
                            {index >= 5 && (
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
                                  # {index + 1}: ${formatCash(Number(bid.price))}
                                </Text>
                                <Text
                                  style={{
                                    color: "black",
                                    fontWeight: "400",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center"
                                  }}
                                >
                                  {props.bidderId === bid.bidderId
                                    ? "You"
                                    : "Other user"}
                                </Text>
                              </View>
                            )}
                          </>
                        )}
                    </Fragment>
                  ))}
                </>
              )}
            </View>
          </Fragment>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = state => {
  return {
    productDetailData: state.productDetail.data,
    productDetailError: state.productDetail.error,
    productDetailLoading: state.productDetail.loading,
    ProductDetailfunction: state.productDetail.function,
    token: state.token,
    bidderId: state.profile.data._id,
    currentBalance: state.profile.data.balance
  };
};
const mapDispatchToProps = {
  getProductDetail,
  bidding,
  quickbid
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

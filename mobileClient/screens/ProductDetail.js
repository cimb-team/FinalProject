import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  Slider
} from "react-native";
import axios from "../axios";
import {
  Container,
  Toast,
  Button,
  Content,
  Card,
  CardItem,
  Icon,
  Right,
  Badge,
  List,
  ListItem,
  Left,
  Body,
  Spinner
} from "native-base";

import { connect } from "react-redux";
import { getProductDetail, bidding, quickbid } from "../store/action";
import Title from "../components/Title";
import dbh from "../FBConfig";
import { NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import formatCash from "../helpers";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

import Products from "./Products";
function ProductDetail(props) {
  const [bid, setbid] = useState("");
  const [bidSlider, setbidslider] = useState(0);
  const [bidDariFirebase, setbidDariFirebase] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");
  const [MinBid, setMinBid] = useState(0);
  const [MaxBid, setMaxBid] = useState(0);
  const [addBid, setAddBid] = useState(0);
  const [countdownText, setcountdownText] = useState("");
  const [bidClosed, setbidClosed] = useState(true);
  const [orvinDetail, setOrvin] = useState({});
  const [loadingClosedDate, setloadingClosedDate] = useState(true);
  let mili = new Date();
  mili.setSeconds(mili.getSeconds() + 30);

  handleChange = e => {
    setbid(bid + e)
    
  };

  add10k = () => {
    setbid(bid + 10000)
    console.log(bid);
    
  }

  add50k = () => {
    setbid(bid + 50000)
    console.log(bid);
  }

  add100k = () => {
    setbid(bid + 100000)
    console.log(bid);
  }

  add500k = () => {
    setbid(bid + 500000)
    console.log(bid);
  }

  add1000k = () => {
    setbid(bid + 1000000)
    console.log(bid);
  }

  postbid = () => {
    // console.log(bid, "<<<<<<<<<<<Bid")
    // console.log(props.productDetailData.initialPrice, "<<<<<<<<<<< ")
    // console.log()
    console.log(bid, "<<<<<<<< bid");
    console.log(MinBid, "<<<<<<<<min Bid");
    console.log(MaxBid, "<<<<<< maxbid");

    let isLargerThan = false;
    console.log(bid, bidDariFirebase);
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
        console.log("Masuk");
        let arr1 = bidDariFirebase.bids;
        arr1.unshift({
          bidderId: props.bidderId,
          dateIssued: new Date(),
          price: bid
        });
        console.log(arr1, "<<<<<<<");

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
            console.log("masuk then create bid");

            props.bidding(bid, props.token, props.productDetailData._id);
          });
        setbid("");
      } else {
        Toast.show({
          style: {
            marginBottom: "70%",
            marginHorizontal: "5%",
            borderRadius: 10,
            backgroundColor: "background-color: rgba(238, 85, 55, 0.7)"
          },
          text: "Saldo Anda tidak mencukupi! Harap lakukan Top Up!",
          duration: 3000,
          type: "danger",
          textStyle: { color: "white", marginBottom: 30, textAlign: "center" },
          // buttonTextStyle: { color: "black" },
          buttonStyle: { backgroundColor: "#EE5537", marginBottom: 20 }
        });
      }
    } else {
      Toast.show({
        style: {
          marginBottom: "70%",
          marginHorizontal: "5%",
          borderRadius: 10,
          backgroundColor: "background-color: rgba(238, 85, 55, 0.7)"
        },
        text: "Penawaran harus lebih besar dari yang terbesar dan harga awal!",
        duration: 3000,
        type: "danger",
        textStyle: { color: "white", marginBottom: 30, textAlign: "center" },
        // buttonTextStyle: { color: "black" },
        buttonStyle: { backgroundColor: "#EE5537", marginBottom: 20 }
      });
    }
  };

  // useEffect(() => {
  //   console.log(props.bidderId, "ini dari sstore login=========================")
  //   props.getProductDetail(props.token, '5d3f6a3b33e440292c43a52b');
  //   dbh
  //   .collection("biding")
  //   .doc(`5d3f6a3b33e440292c43a52c`)
  //   .onSnapshot(function(doc) {
  //     console.log("XXXXX", doc.data(), "====");
  //     const dataBaru = doc.data()
  //     setbidDariFirebase(doc.data());
  //     setbid(Number(dataBaru.bids[0].price + 1))
  //   });
  // }, []);

  useEffect(() => {
    if (Object.keys(props.productDetailData).length > 0) {
      dbh
        .collection("biding")
        .doc(`${props.productDetailData.bid._id}`)
        .onSnapshot(function(doc) {
          const dataBaru = doc.data();
          console.log(dataBaru);
          setbidDariFirebase(dataBaru);
          if (dataBaru) {
            if (dataBaru.bids.length > 0) {
              setbid(Number(dataBaru.bids[0].price) + 1);
              setMinBid(Number(dataBaru.bids[0].price) + 1);
              setMaxBid(Number(dataBaru.bids[0].price) * 3);
            } else {
              setbid(Number(props.productDetailData.initialPrice) + 1);
              setMinBid(Number(props.productDetailData.initialPrice) + 1);
              setMaxBid(Number(props.productDetailData.initialPrice) * 3);
            }
          }
        });
    }

    if (props.productDetailData.status === "open") setbidClosed(false);
    else if (props.productDetailData.status === "close") setbidClosed(true);

    if (props.productDetailData.closedDate) {         
      setOrvin(props.productDetailData)

      var interval = setInterval(() => {
        // let closedDate = moment(mili)
        let closedDate = moment(props.productDetailData.closedDate);
        // let closedDate = moment(mili)
  
        let now = moment();
        let countdown = moment.duration(closedDate.diff(now));

        if (closedDate.diff(now) <= 0) {
          setbidClosed(true);
          setcountdownText(
            closedDate.calendar(null, {
              sameDay: () => "[" + now.to(closedDate) + "]",
              sameElse: () => "[" + now.to(closedDate) + "]"
            })
          );

        } else {
          setcountdownText(
            closedDate.calendar(null, {
              sameDay: () => "[" + countdown.format() + "]",
              // sameDay: () => '[' + moment.duration(closedDate.diff(now)).format('HH:mm:ss.SSS') + ']',
              sameElse: () => "[" + now.to(closedDate) + "]"
            })
          );
        }
        setloadingClosedDate(false);
      }, 1000);

    }
    if (props.productDetailData._id != props.navigation.state.params.id) {
      return clearInterval(interval);
    }
  }, [props.productDetailData]);

  // useEffect(() => {
  //   if (props.productDetailData._id != props.navigation.state.params.id) {
  //     props.getProductDetail(props.token, props.navigation.state.params.id);
  //   } else if (props.ProductDetailfunction) {
  //     dbh
  //       .collection("biding")
  //       .doc(`${props.productDetailData.bid._id}`)
  //       .onSnapshot(function(doc) {
  //         console.log("XXXXX", doc.data(), "====");
  //         const dataBaru = doc.data()
  //         setbidDariFirebase(doc.data());
  //         if(dataBaru.bids.length !== 0) {
  //           setbid(Number(dataBaru.bids[0].price)+1)
  //           setMinBid(Number(dataBaru.bids[0].price))
  //           setMaxBid(Number(dataBaru.bids[0].price)*2)
  //         } else {
  //           setbid(Number(props.productDetailData.initialPrice))
  //           setMinBid(Number(props.productDetailData.initialPrice)+1)
  //           setMaxBid(Number(props.productDetailData.initialPrice)*3)
  //         }
  //       });
  //   } else {
  //     console.log(
  //       props.navigation.state.params.id,
  //       "++++++++++++++++++++++++++++"
  //     );

  //     props.getProductDetail(props.token, props.navigation.state.params.id);
  //   }
  // }, [props.ProductDetailfunction]);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          console.log("token " + props.token);
          console.log("params " + props.navigation.state.params.id);
          props
            .getProductDetail(props.token, props.navigation.state.params.id)
            .then((data) => {
              console.log('====')
              console.log(props.productDetailData)
     
            })
            .catch(err => {
              console.log(err);
            });
        }}
      />

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View
          style={{
            width: width * 1,
            backgroundColor: "white",
            marginTop: height * 0.4,
            alignItem: "center",
            flex: 1
          }}
        >
          <View
            style={{
              width: width * 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{ width: "85%", alignItems: "center", marginTop: "22%" }}
            >
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#EE5537" }}
              >
                {props.productDetailData.title}
              </Text>
            </View>
            {props.productDetailData.userId && (
              <View style={{ width: "85%", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "#8B8B8B" }}
                >
                  {props.productDetailData.userId.name}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              width: width * 1,
              marginTop: 30,
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ width: "85%" }}>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "justify",
                  color: "#8B8B8B",
                  fontWeight: "bold"
                }}
              >
                The expression or application of human creative skill and
                imagination, typically in a visual form such as painting or
                sculpture, producing works to be appreciated primarily for their
                beauty or emotional power The expression or application of human
                creative skill and imagination, typically in a visual form such
                as painting or sculpture, producing works to be appreciated
                primarily for their beauty or emotional power The expression or
                application of human creative skill and imagination, typically
                in a visual form such as painting or sculpture, producing works
                to be appreciated primarily for their beauty or emotional power
              </Text>
            </View>
          </View>

          <View
            style={{
              width: width * 1,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: "85%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#EE5537", fontWeight: "bold" }}
                >
                  Starting Bid : 12/12/2019
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#EE5537", fontWeight: "bold" }}
                >
                  Closing Bid : {countdownText}
                </Text>
              </View>
            </View>
          </View>

          {
            props.productDetailData.userId && (
              bidDariFirebase && (
                !bidDariFirebase.closed && (
                  props.productDetailData.userId._id !== props.bidderId
                  ? (

                    <View
              style={{ width: width * 1, height: 325, alignItems: "center" }}
            >
              <View
                style={{ width: "85%", alignItems: "center" }}
              >
                <Card style={{ width: "100%",  }}>
                  <CardItem>
                    <Body>
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center"
                        }}
                      >
                        {bidDariFirebase &&
                          (bidDariFirebase.bids ? (
                            <React.Fragment>
                              <View
                                style={{ width: "100%", alignItems: "center" }}
                              >
                                <Text
                                  style={{
                                    fontSize: 30,
                                    fontWeight: "bold",
                                    color: "#EE5537",
                                  }}
                                >
                                  PLACE YOUR BID
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  marginTop: 10,
                                  marginBottom: 10
                                }}
                              >
                                <View
                                  style={{ width: "50%", alignItems: "center" }}
                                >
                                  <Text style={{color:'#EE5537', fontWeight : 'bold'}}>{`Current Price`}</Text>
                                  {bidDariFirebase.bids.length !== 0 ? (
                                    <Text  style={{color:'grey', fontWeight : 'bold'}}>
                                      {formatCash(
                                        Number(bidDariFirebase.bids[0].price)
                                      )}
                                    </Text>
                                  ) : (
                                    <Text  style={{color:'grey', fontWeight : 'bold'}}>
                                      {formatCash(
                                        props.productDetailData.initialPrice
                                      )}
                                    </Text>
                                  )}
                                </View>
                                <View
                                  style={{ width: "50%", alignItems: "center" }}
                                >
                                  <Text style={{color:'#EE5537', fontWeight : 'bold'}}>{`Your Bid`}</Text>
                                  <Text style={{color:'grey', fontWeight : 'bold'}}> {formatCash(Number(bid))}</Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  width: "100%",
                                  marginTop: 10,
                                  height: 50,
                                  alignItems: "center",
                                  flexDirection : 'row',
                                  justifyContent : "space-around",

                                }}
                              >
                              <View style={{width:'15%', height:'90%', backgroundColor:'#EE5537',borderRadius:10, justifyContent: 'center', alignItems:'center'}}>
                                  <TouchableHighlight onPress={add10k}>
                                  <Text style={{fontSize:17, fontWeight:'bold', color:'white'}}>10K</Text>
                                  </TouchableHighlight>
                              </View>

                              <View style={{width:'15%', height:'90%', backgroundColor:'#EE5537',borderRadius:10, justifyContent: 'center', alignItems:'center'}}>
                              <TouchableHighlight onPress={add50k}>
                                  <Text style={{fontSize:17, fontWeight:'bold', color:'white'}}>50K</Text>
                                  </TouchableHighlight>
                              </View>

                              <View style={{width:'15%', height:'90%', backgroundColor:'#EE5537',borderRadius:10, justifyContent: 'center', alignItems:'center'}}>
                              <TouchableHighlight onPress={add100k}>
                                  <Text style={{fontSize:17, fontWeight:'bold', color:'white'}}>100K</Text>
                                  </TouchableHighlight>
                              </View>

                              <View style={{width:'15%', height:'90%', backgroundColor:'#EE5537',borderRadius:10, justifyContent: 'center', alignItems:'center'}}>
                              <TouchableHighlight onPress={add500k}>
                                  <Text style={{fontSize:17, fontWeight:'bold', color:'white'}}>500K</Text>
                                  </TouchableHighlight>
                              </View>

                              <View style={{width:'15%', height:'90%', backgroundColor:'#EE5537',borderRadius:10, justifyContent: 'center', alignItems:'center'}}>
                              <TouchableHighlight onPress={add1000k}>
                                  <Text style={{fontSize:14, fontWeight:'bold', color:'white'}}>1000K</Text>
                                  </TouchableHighlight>
                              </View>
                                
                              </View>
                              <View
                                style={{
                                  width: "100%",
                                  height: 50,
                                  alignItems: "center"
                                }}
                              >
                                <Slider
                                minimumValue={100000}
          maximumValue={1000000}
          minimumTrackTintColor="#1EB1FC"
          maximumTractTintColor="#1EB1FC"
          step={10000}
          value={4}
          onSlidingComplete={value => handleChange(value)}
                                  style={styles.slider}
                                  thumbTintColor="#EE5537"
                                />
                              </View>

                              <View>
                                <Button
                                  rounded
                                  style={{
                                    backgroundColor: "#EE5537",
                                    padding: 20,
                                    marginTop:20
                                  }}
                                  onPress={postbid}
                                >
                                  <Text style={{ color: "white", textAlign:'center', width:'85%', marginLeft:'10%' }}>
                                    Place Bid
                                  </Text>
                                </Button>
                              </View>
                            </React.Fragment>
                          ) : (
                            <View
                              style={{
                                marginTop: "10%",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <ActivityIndicator size="large" color="#EE5537" />
                            </View>
                          ))}
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              </View>
            </View>
                  )
                  : (
                    <View
              style={{ width: width * 1, height: 125, alignItems: "center" }}
            >
              <View
                style={{ width: "85%", height: "100%", alignItems: "center" }}
              >
               
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          alignItems: "center"
                        }}
                      >
                        {bidDariFirebase &&
                          (bidDariFirebase.bids ? (
                            <React.Fragment>
                              <View
                                style={{ width: "100%", alignItems: "center", marginTop:10 }}
                              >
                              </View>

                              <View>
                                <Button
                                  rounded
                                  style={{
                                    backgroundColor: "#EE5537",
                                    
                                  }}
                                  onPress={props.quickbid}
                                >
                                  <Text style={{ color: "white", width:'85%',textAlign : 'center' , marginLeft:'10%' }}>
                                    Close Bid
                                  </Text>
                                </Button>
                              </View>
                            </React.Fragment>
                          ) : (
                            <View
                              style={{
                                marginTop: "10%",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <ActivityIndicator size="large" color="#EE5537" />
                            </View>
                          ))}
                      </View>
                  
              </View>
            </View>
                  )

                )
              )
              
              
            )
          }

          <View
            style={{
              width: width * 1,
              marginTop: "15%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ width: "85%", marginTop: "5%" }}>
              <Card style={{ width: "100%", alignItems: "center" }}>
                <CardItem>
                  <Body>
                    <View style={{ width: "100%", alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: "#EE5537"
                        }}
                      >
                        BID HISTORY
                      </Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Content>
                        <Card>
                          <List>
                            {bidDariFirebase ? (
                              bidDariFirebase.bids.map((product, index) => (
                                <ListItem key={index}>
                                  <Left>
                                    <Text>
                                      {formatCash(Number(product.price))}
                                    </Text>
                                  </Left>
                                  <Right style={{ width: 100 }}>
                                    {product.bidderId === props.bidderId ? (
                                      <Badge
                                        style={{
                                          justifyContent: "center",
                                          backgroundColor: "#EE5537"
                                        }}
                                      >
                                        <Text style={{ color: "white" }}>
                                          You
                                        </Text>
                                      </Badge>
                                    ) : (
                                      <Text
                                        style={{ color: "black" }}
                                      >{`User Id : ${product.bidderId.substring(
                                        18
                                      )}`}</Text>
                                    )}
                                  </Right>
                                </ListItem>
                              ))
                            ) : (
                              <View
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center"
                                }}
                              >
                                <ActivityIndicator
                                  size="large"
                                  color="#EE5537"
                                />
                              </View>
                            )}
                          </List>
                        </Card>
                      </Content>
                    </View>
                    {props.productDetailData ? (
                      <View style={{ width: "100%", alignItems: "center" }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "#8B8B8B"
                          }}
                        >{`Initial Prize : ${formatCash(
                          Number(props.productDetailData.initialPrice)
                        )}`}</Text>
                      </View>
                    ) : (
                      <Text>0</Text>
                    )}
                  </Body>
                </CardItem>
              </Card>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          width: width * 1,
          height: height * 0.5,
          borderBottomLeftRadius: 70,
          backgroundColor: "#D7D7D7",
          position: "absolute"
        }}
      >
        {props.productDetailLoading ? (
          <View
            style={{
              marginTop: "10%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color="#EE5537" />
          </View>
        ) : props.productDetailData ? (
          <View
            style={{
              width: width * 1,
              height: height * 0.5,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{ width: "80%", height: "80%" }}
              source={{ uri: props.productDetailData.images[0] }}
            />
          </View>
        ) : (
          <Text>amsyonh</Text>
        )}
      </View>
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
    alignItems: "center"
  },
  slider: {
    marginTop: 30,
    width: "80%",
  },
  search: {
    height: 35,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    width: 150
  }
});

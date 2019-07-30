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
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  Slider
} from "react-native";
import { connect } from "react-redux";
import { getProductDetail, bidding } from "../store/action";
import Title from "../components/Title";
import dbh from "../FBConfig";
import { NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";

import formatCash from "../helpers";

function ProductDetail(props) {
  const [bid, setbid] = useState("");
  const [bidSlider, setbidslider] = useState(0)
  const [bidDariFirebase, setbidDariFirebase] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");
  handleChange = e => {
    setbid(e);
  };

  setBidValue = (er) => {
      console.log(er);
      
  }
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
    props.getProductDetail(props.token, '5d3f6a3b33e440292c43a52b');
    dbh
    .collection("biding")
    .doc(`5d3f6a3b33e440292c43a52c`)
    .onSnapshot(function(doc) {
      console.log("XXXXX", doc.data(), "====");
      setbidDariFirebase(doc.data());
    });
  }, []);




  // useEffect(() => {
  //   if (props.productDetailData._id != props.navigation.state.params.id) {
  //     props.getProductDetail(props.token, props.navigation.state.params.id);
  //   } else if (props.ProductDetailfunction) {
  //     dbh
  //       .collection("biding")
  //       .doc(`${props.productDetailData.bid._id}`)
  //       .onSnapshot(function(doc) {
  //         console.log("XXXXX", doc.data(), "====");
  //         setbidDariFirebase(doc.data());
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
        <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          <View style={{width:width*1, height:height*2, backgroundColor : 'white',marginTop:height*0.4, alignItem:'center', }}>
             <View style={{width: width*1,height: 132,alignItems: "center",justifyContent: "center"}}>
                  <View style={{width:"85%", alignItems:'center',marginTop:'22%'}}>
                      <Text style={{fontSize:30, fontWeight:'bold', color:'#EE5537'}}>ASTRONOUT</Text>
                  </View>
                  <View style={{width:"85%", alignItems:'center'}}>
                      <Text style={{fontSize:14, fontWeight:'bold', color:'#EE5537'}}>Andhika Mahesa</Text>
                  </View>
             </View> 



             <View style={{width: width*1,marginTop:30,alignItems: "center",justifyContent: "center", }}>
                  <View style={{width:"85%",}}>
                      <Text  style={{fontSize:12,textAlign:'justify', color:'#8B8B8B', fontWeight:'bold'}}>
                      The expression or application of human creative skill and imagination, typically in a visual form such as painting or sculpture, producing works to be appreciated primarily for their beauty or emotional power
                      The expression or application of human creative skill and imagination, typically in a visual form such as painting or sculpture, producing works to be appreciated primarily for their beauty or emotional power
                      The expression or application of human creative skill and imagination, typically in a visual form such as painting or sculpture, producing works to be appreciated primarily for their beauty or emotional power

                      </Text>
                  </View>
             </View> 


             <View style={{width: width*1,marginTop:10,alignItems: "center",justifyContent: "center", }}>
                  <View style={{width:"85%",flexDirection:'row', alignItems: "center",justifyContent: "center"}}>
                        <View style={{width:"50%",alignItems: "center",justifyContent: "center"}}>
                            <Text  style={{fontSize:12, color:'#EE5537', fontWeight:'bold'}}>Starting Bid : 12/12/2019</Text>
                        </View>
                        <View style={{width:"50%",alignItems: "center",justifyContent: "center"}}>
                            <Text  style={{fontSize:12, color:'#EE5537', fontWeight:'bold'}}>Closing Bid : 12/12/2019</Text>
                        </View>
                  </View>
             </View> 


             <View style={{width: width*1,height: 132,alignItems: "center",justifyContent: "center"}}>
                  <View style={{width:"85%", alignItems:'center'}}>
                      <Text style={{fontSize:30, fontWeight:'bold', color:'#EE5537'}}>PLACE YOUR BID</Text>
                      <Text>{bidSlider}</Text>
        <Slider
          minimumValue={1}
          maximumValue={700}
          minimumTrackTintColor="#1EB1FC"
          maximumTractTintColor="#1EB1FC"
          step={1}
          value={4}
          onValueChange={value => setBidValue(value)}
          style={styles.slider}
          thumbTintColor="#1EB1FC"
        />
                  </View>
             </View> 
             
             
          </View>
          </ScrollView>
        
          <View style={{width:width*1, height:height*0.5, borderBottomLeftRadius:70, backgroundColor : '#D7D7D7', position:'absolute'}}>
          {props.productDetailLoading ? <View style={{marginTop:'10%',justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="#EE5537" /></View> :
           props.productDetailData ? <View style={{width: width*1,height: height*0.5,alignItems: "center",justifyContent: "center"}}>
           <Image style={{width: "80%",height: "80%",}} source={{ uri: props.productDetailData.images[0]}}/>
             </View> : <Text>amsyonh</Text>  }
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
    alignItems : 'center'
  },
  slider: {
    position: 'absolute',
    marginTop: 100,
    width: 200,
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
    borderWidth: 0.5,
    width: 150
  }
});

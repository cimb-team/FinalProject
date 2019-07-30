import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/Card";
import React, { Fragment, useState, useEffect } from "react";
import { getAllProducts } from "../store/action";
import { connect } from "react-redux";
import TopBar from "../components/TopBar";
import Constants from "expo-constants";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get("window");
const height = width * 0.6;



function Product(props) {

  const [HCarousel, setHCarousel] = useState(34.5)
  const [images, setImage] = useState([
    {
      id: 1,
      title: "Astronaut",
      artist : 'Rendy Prayoga',
      price: "12000",
      desc: "Now lets try for a Horizontal gradient. gradient...",
      uri: require('../assets//productDummy/1.png')
    },
    {
      id: 2,
      title: "Mario",
      price: "12000",
      artist : 'Sandy',
      desc: "Now lets try for a Horizontal gradient. gradient...",
      uri: require('../assets//productDummy/13.png')
    },
    {
      id: 3,
      title: "Mysterius",
      price: "12000",
      artist : 'Merry',
      desc: "Now lets try for a Horizontal gradient. gradient...",
      uri: require('../assets//productDummy/14.png')
    }
  ]);
  useEffect(() => {
    props.getAllProducts(props.token);
  }, []);
  


  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <TopBar navigation={props.navigation} screen={'products'} />
      </View>
      <ScrollView contentContainerStyle={{justifyContent : 'center', alignItems:'center'}}  showsVerticalScrollIndicator={false} style={{
          // height: "100%",
          width:"100%",
          // marginTop: 6,
          // marginBottom: "25%"
          
        }}>
    
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
        > 
          {images.map(image => (
            <View style={{ width: "33.35%", height: "100%" }} key={image.id}>
              <View style={{backgroundColor:'#DEDEDE', width:width, height:height, justifyContent:'center', alignItems:'center'}}>
                <Image style={{width : "45%", height:'75%'}}  source={image.uri}></Image></View>
              <View
                style={{
                  backgroundColor: "transparent",
                  height: "55%",
                  width: "100%",
                  marginTop: "25%",
                  position: "absolute"
                }} 
              >
                
                  <Text
                    style={{
                      color: "#EE5537",
                      fontWeight: "bold",
                      fontSize: 25,
                      marginTop: '12%',
                      marginLeft: '5%'
                    }}
                  >
                    {image.title}
                  </Text>
                  <Text style={{ color: "#EE5537", marginLeft: '5%' }}>
                    {`by : ${image.artist}`}
                  </Text>
                  <Text style={{ color: "#EE5537", marginLeft: '5%' }}>
                    {image.desc}
                  </Text>
              </View>
            </View>
          ))}
        </ScrollView> 
        
          {props.allProductsLoading ? <View style={{marginTop:'10%',justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="#EE5537" /></View> : (
            <Fragment>
              {props.allProductsData.map(product => (
                <View style={{width:'90%'}} key={product._id}>
                <Card
                  
                  product={product}
                  navigation={props.navigation}
                />
                </View>
              ))}
            </Fragment>
          )}
        </ScrollView>
    </View>
  );
}
const mapStateToProps = state => {
  return {
    allProductsData: state.allProducts.data,
    allProductsError: state.allProducts.error,
    allProductsLoading: state.allProducts.loading,
    token: state.token
  };
};
const mapDispatchToProps = {
  getAllProducts
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "white"
  },
  image: {
    width,
    height
  }
});

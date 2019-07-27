
import { View, ScrollView, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base'
import React, { Fragment, useState, useEffect } from "react";
import { getAllProducts } from "../store/action";
import { connect } from "react-redux";
const { width } = Dimensions.get('window');
const height = width * 0.6

const ProductDummy = [
  {
    id: 1,
    title: "Street Art Grafity",
    price: "1.000.000",
    desc: 'Now lets try for a Horizontal gradient. gradient...',
    artist : 'Rendy',
    uri: require('../assets/productDummy/illustrator1.jpg')
  },
  {
    id: 2,
    title: "Mario Characther Design",
    price: "1.500.000",
    desc: 'Now lets try for a Horizontal gradient. gradient...',
    artist : 'sukma',
    uri: require('../assets/productDummy/character1.jpg')
  },
  {
    id: 3,
    title: "Angry Face Illustration",
    price: "6.000.000",
    desc: 'Now lets try for a Horizontal gradient. gradient...',
    artist : 'Jani',
    uri: require('../assets/productDummy/illustrator2.jpg')
  },
  {
    id: 4,
    title: "Lion Face Illustrator",
    price: "3.000.000",
    desc: 'Now lets try for a Horizontal gradient. gradient...',
    artist : 'Karin',
    uri: require('../assets/productDummy/illustrator4.jpg')
  },
  {
    id: 5,
    title: "Monkey Astronaut",
    price: "2.000.000",
    desc: 'Now lets try for a Horizontal gradient. gradient...',
    uri: require('../assets/productDummy/illustrator7.jpg')
  },
  {
    id: 6,
    title: "Street Art Grafity",
    price: "1.000.000",
    desc: 'Now lets try for a Horizontal gradient. gradient...',
    artist : 'Garin',
    uri: require('../assets/productDummy/illustrator1.jpg')
  },
  {
    id: 7,
    title: "Street Art Grafity",
    price: "5000.000",
    desc: 'Now lets try for a Horizontal gradient. gradient...',
    artist : 'Kevin',
    uri: require('../assets/productDummy/illustrator6.jpg')
  }
]

function Product(props) {
  const [images, setImage] = useState([
    {
      id: 1,
      title: "Street Art Grafity",
      price: "12000",
      desc: 'Now lets try for a Horizontal gradient. gradient...',
      uri: 'https://i.ibb.co/p1QwTC7/illustrator7.jpg'
  
    },
    {
      id: 2,
      title: "Floral",
      price: "12000",
      desc: 'Now lets try for a Horizontal gradient. gradient...',
      uri: 'https://i.ibb.co/CH4jrj5/illustrator4.jpg'
  
    },
    {
      id: 3,
      title: "Nature Food Logo",
      price: "12000",
      desc: 'Now lets try for a Horizontal gradient. gradient...',
      uri: 'https://i.ibb.co/prP4KkY/illustrator1.jpg'
  
    },
  ])
  useEffect(() => {
    props.getAllProducts();
  }, []);
    return (
      <View style={styles.container}>

        <View style={styles.scrollContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true}>
            {images.map(image => (
              <View style={{ width: '33.35%', height: '100%' }} key={image.id}>
                <Image style={styles.image} source={{ uri: image.uri }}></Image>
                <View style={{ backgroundColor: 'transparent', height: '35%', width: '100%', marginTop: '45%', position: 'absolute' }}>
                  <LinearGradient
                    colors={['transparent', '#524F4F']}
                    style={{ flex: 1 }}
                  >

                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 10, marginLeft: 10 }}>{image.title}</Text>
                    <Text style={{ color: 'black', marginLeft: 10 }}>{image.desc}</Text>
                  </LinearGradient>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        

        <View  style={{ height: '100%', width: '90%', marginTop:6, marginBottom:'25%' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {!props.allProductsLoading && (
          <Fragment>
          { props.allProductsData.map(product => (

            
            <Card key={product._id}>
              <CardItem >
                <Body style={{ flexDirection: 'row', width: '100%' }}>
                  <View style={{ width: '45%' }}>
                    <Image source={{uri: product.images[0]}} style={{ height: 120, width: 150 }} />
                  </View>
                  <View style={{ width: '55%', height: '100%', flex: 1, }}>
                    <View style={{height:90 }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 3 }}>{product.title}</Text>
                      <Text style={{ fontSize: 13 }}>{product.details}</Text>
                    </View>
                    <View style={{ width: '100%', height: 30, flexDirection: 'row', alignItems: 'flex-end' }}>
                      <View style={{ width: '22%' }}>
                        <Text style={{ fontSize:10}}>{product.closedDate}</Text>
                      </View>
                      <View style={{ width: '38%' }}>
                        <Text style={{ fontSize:10}}>{product.category}</Text> 
                      </View>
                      <View style={{ width: '40%' }}>
                        <Text style={{ fontSize:10}}>{product.initialPrice}</Text>
                      </View>
  
                    </View>
                  </View>
                </Body>
              </CardItem>
            </Card>
          
             ))}
          </Fragment>
        )}


        </ScrollView>
        </View> 

        


      </View>
    );
  
}
const mapStateToProps = state => {
  return {
    allProductsData: state.allProducts.data,
    allProductsError: state.allProducts.error,
    allProductsLoading: state.allProducts.loading
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
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white'

  },
  scrollContainer: {
    height: '34.5%',
    width: '100%',
    backgroundColor: 'red',
  },
  image: {
    width,
    height,
  },
});
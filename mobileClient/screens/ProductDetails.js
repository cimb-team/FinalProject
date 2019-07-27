import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base'

const { width } = Dimensions.get('window');
const height = width * 0.6


export default class ProductDetails extends Component {
  render() {
    const images = [
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
    ]


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

    return (
      <View style={styles.container}>
          <View style={{height:"50%",width:'100%',paddingTop:'15%', backgroundColor:'white'}}>
          <Image style={styles.image} source={require('../assets/productDummy/illustrator4.jpg')}></Image>
          </View>
          <View style={{width:'100%', backgroundColor:'white'}}>
              <ScrollView>
              <View style={{height:200,width:'90%'}}>
                <Container>
                    <Card>
                      <CardItem header bordered>
                        <Text>Rp. 1.250.000</Text>
                      </CardItem>
                      <CardItem bordered>
                        <Body>
                          <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                          </Text>
                        </Body>
                      </CardItem>
                      <CardItem footer bordered>
                        <Text>GeekyAnts</Text>
                      </CardItem>
                    </Card>
                </Container>
                </View>

               

      

              </ScrollView>
          </View>
      </View>
    );
  }
}

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
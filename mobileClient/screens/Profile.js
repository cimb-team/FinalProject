import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Platform, Text, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, ListItem, Left, List, Body, Right } from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const height = width * 0.6


export default class ProfilePage extends Component {
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
        artist: 'Rendy',
        uri: require('../assets/productDummy/illustrator1.jpg')
      },
      {
        id: 2,
        title: "Mario Characther Design",
        price: "1.500.000",
        desc: 'Now lets try for a Horizontal gradient. gradient...',
        artist: 'sukma',
        uri: require('../assets/productDummy/character1.jpg')
      },
      {
        id: 3,
        title: "Angry Face Illustration",
        price: "6.000.000",
        desc: 'Now lets try for a Horizontal gradient. gradient...',
        artist: 'Jani',
        uri: require('../assets/productDummy/illustrator2.jpg')
      },
      {
        id: 4,
        title: "Lion Face Illustrator",
        price: "3.000.000",
        desc: 'Now lets try for a Horizontal gradient. gradient...',
        artist: 'Karin',
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
        artist: 'Garin',
        uri: require('../assets/productDummy/illustrator1.jpg')
      },
      {
        id: 7,
        title: "Street Art Grafity",
        price: "5000.000",
        desc: 'Now lets try for a Horizontal gradient. gradient...',
        artist: 'Kevin',
        uri: require('../assets/productDummy/illustrator6.jpg')
      }
    ]

    function logout(){
      AsyncStorage.clear()
        .then(() => 
          this.props.navigation.navigate('Signin')
        )
        .catch(err => 
          console.log(err)
        )
    }

    return (
      <ScrollView>
      <View contentContainerStyle={styles.container}>
        <View style={{ height: '50%', width: '100%', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }} >

          <Image style={{ width: 200, height: 200, borderRadius: 100 }} source={{ uri: 'https://scontent-yyz1-1.cdninstagram.com/vp/6f0f04259967b3bf81755aa6a6367444/5DB02531/t51.2885-19/s150x150/49933428_2477268329014493_2549259756728483840_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com' }} />
          <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 20 }}>Orvin Savero</Text>
          <Text style={{ fontSize: 15, marginTop: 5 }}> Artist</Text>

        </View>

        <View style={{ width: '95%', height: 250, backgroundColor: 'white', marginTop: 15 }}>
          <Button onPress={logout} block danger>
            <Text>
              Logout
            </Text>
          </Button>
          <Card>
            <CardItem>
              <Body>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Blance
                </Text>
                <Text style={{ fontSize: 14 }}>
                  Rp 1.000.000
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Email
                </Text>
                <Text style={{ fontSize: 14 }}>
                  Orvinsavero@gmail.com
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Phone Number
                </Text>
                <Text style={{ fontSize: 14 }}>
                  0895867182738
                </Text>
              </Body>
            </CardItem>
          </Card>
        </View>

        <View style={{ width: '95%', height: 90, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ width: '45%', height: '90%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: '100%' }}>
              <CardItem>
                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome name="history" size={45} color="black" />
                  <Text style={{ fontSize: 10 }}>Bid History</Text>
                </Body>
              </CardItem>
            </Card>

          </View>

          <View style={{ width: '45%', height: '90%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: '100%' }}>
              <CardItem>
                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome name="money" size={45} color="black" />
                  <Text style={{ fontSize: 10 }}>TopUp Balance</Text>
                </Body>
              </CardItem>
            </Card>

            

          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
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
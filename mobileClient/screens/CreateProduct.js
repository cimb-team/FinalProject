import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Container, DatePicker, Textarea, Item, Input, Header, Content, Form, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base'
import { ImagePicker, Permissions } from 'expo';
import axios from 'axios';


const { width } = Dimensions.get('window');
const height = width * 0.6

var today = new Date();
var tomorrow = new Date();
var maxDate = new Date();
tomorrow.setDate(today.getDate()+1);
maxDate.setDate(today.getDate()+2);


export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      image: null,
      title : '',
      category : '',
      initialPrize : 0,
      details : '',
      imageMentah : ''

    };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
   let day = newDate.getDate()
   let  month = newDate.getMonth()+1
   let year = newDate.getFullYear()
    this.setState({ chosenDate: `${month}-${day}-${year}`});
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  submitCreate = () => {
  const imageFilenameBeforeSplit = this.state.image.split('/')
   const imageFilename = imageFilenameBeforeSplit[imageFilenameBeforeSplit.length - 1]
    
    const data = new FormData()
    data.append('images', {
      uri : this.state.image,
      type : 'image/jpeg',
      name : imageFilename
    })
    data.append('title', this.state.title)
    data.append('category', this.state.category)
    data.append('details', this.state.details)
    data.append('initialPrice', this.state.initialPrize)
    data.append('closeDate', this.state.chosenDate)

    axios({
      method: 'post',
      url: 'http://35.187.231.14/product',
      data,
      headers : {
        "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkM2QyNGM4NzllM2FjNTc0MDM5ZDQzYSIsImVtYWlsIjoiZGVkeUBnbWFpbC5jb20iLCJpYXQiOjE1NjQyODgyMzB9.m3vrB894isZsiJ4fqxh1fdJepAzFIdAOzxZ_qVdaoqk',
        "content-type": "multipart/form-data"
      }
    })
    .then(({data})=>{
      console.log("masuk then sukses");
      
      console.log(data);
      
    })
    .catch((err)=>{
      console.log("masuk error");
      
    })
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      
    });

   

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, imageMentah : result });
    }
  };

  render() {

    let { image } = this.state;
    return (
      <View style={styles.container}> 
        
          <View style={{ height: '25%', width: '90%', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: '100%', width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableHighlight onPress={this._pickImage}>
                {image ?
                  <Image source={{ uri: image }} style={{ width: 300, height: 170 }} />
                  :
                  <Ionicons name="ios-image" size={32} color="black" />}
              </TouchableHighlight>
              {!image &&
                <Text style={{ fontSize: 10 }}>Upload Design</Text>}

            </View>
          </View>

          <View style={{ height: '100%', width: '90%', backgroundColor: 'green' }}>
            <View style={{ width: '100%', height: '100%' }}>
              <Container>
                <Content>
                  <Form >
                    <Item>
                      <Input placeholder="Title" onChangeText={(text) => this.setState({title : text})} />
                    </Item>
                    <Item>
                      <Input placeholder="Category" onChangeText={(text) => this.setState({category : text})} />
                    </Item>
                    <Item>
                      <Input placeholder="Initial Prize" keyboardType='numeric' onChangeText={(text) => this.setState({initialPrize : text})} />
                    </Item>
                    <Item>
                      <Content>
                        <DatePicker 
                          defaultDate={tomorrow}
                          minimumDate={today}
                          maximumDate={maxDate}
                          locale={"en"}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType={"fade"}
                          androidMode={"default"}
                          placeHolderText="Select Close Date"
                          textStyle={{ color: "green" }}
                          placeHolderTextStyle={{ color: "grey", fontSize: 18 }}
                          onDateChange={this.setDate}
                          disabled={false}
                        />
                      </Content>
                    </Item>
                    <Item>
                      <Textarea onChangeText={(text) => this.setState({details : text})} style={{ width: '100%', marginTop: 10 }} rowSpan={5} bordered placeholder="Description" />
                    </Item>
                    <Item style={{ width: '100%', marginTop: 10 }}>
                      <Button onPress={this.submitCreate} style={{ width: '100%', marginTop: 10 }} block>
                        <Text>Create Product</Text>
                      </Button>
                    </Item>
                  </Form>
                </Content>
              </Container>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
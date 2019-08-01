import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAllProducts, getMyProducts } from "../store/action";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  Container,
  DatePicker,
  Text,
  Textarea,
  Item,
  Input,
  Header,
  Content,
  Form,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Toast,
  Spinner
} from "native-base";
import { ImagePicker, Permissions } from "expo";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "../axios";
// import * as firebase from 'firebase';
import { connect } from "react-redux";
import dbh from "../FBConfig";
import { NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import moment from "moment";

const { width } = Dimensions.get("window");
const height = width * 0.6;
// var db = firebase.firestore();
var today = new Date();
var tomorrow = new Date();
var maxDate = new Date();
tomorrow.setDate(today.getDate() + 1);
maxDate.setDate(today.getDate() + 2);

const AnimatedKeyboardAvoiding = Animatable.createAnimatableComponent(
  KeyboardAvoidingView
);



class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: moment(tomorrow).format("MM-DD-YYYY"),
      image: null,
      title: "",
      category: "",
      initialPrize: "0",
      details: "",
      imageMentah: "",
      dateText: moment(tomorrow).format("dddd, MMMM Do YYYY"),
      loading: false,
      KeyboardView: false,
      isDateTimePickerVisible: false,
      dateAnddTime : null,
    };
    this.setDate = this.setDate.bind(this);

  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = date => {
    
    this.setState({
      dateAnddTime : moment(date).format()
    })
    this.hideDateTimePicker();
  };

  setDate(newDate) {
    // let day = newDate.getDate();
    // let month = newDate.getMonth() + 1;
    // let year = newDate.getFullYear();
    // this.setState({ chosenDate: `${month}-${day}-${year}` });
    this.setState({ chosenDate: moment(newDate).format("MM-DD-YYYY") });
    this.setState({ dateText: moment(newDate).format("dddd, MMMM Do YYYY") });
  }

  componentDidMount() {
    this.getPermissionAsync();
  }



  submitCreate = () => {
    this.setState({ loading: true });
    console.log("masuk woy");
    let errorMessage = [];
    console.log(typeof this.state.initialPrize, this.state.initialPrize);
    if (this.state.initialPrize === "0")
      errorMessage.push("Initial Prize must be more than 0");
    for (let key in this.state) {
      if (!this.state[key]) {
        switch (key) {
          case "image":
            errorMessage.push("You must upload an image");
            break;
          case "title":
            errorMessage.push("Title cannot be blank");
            break;
          case "category":
            errorMessage.push("Category cannot be blank");
            break;
          case "initialPrize":
            errorMessage.push("Initial prize cannot be blank");
            break;
          case "details":
            errorMessage.push("Details cannot be blank");
            break;
          default:
            break;
        }
      }
    }
    console.log(errorMessage);
    console.log(this.state);
    if (errorMessage.length > 0) {
      this.setState({ loading: false });
      Toast.show({
        style: {
          marginBottom: "11%",
          marginHorizontal: "5%",
          borderRadius: 10,
          backgroundColor: "rgba(236, 232, 232, 0.5)"
        },
        text: errorMessage.join(", "),
        buttonText: "OK",
        duration: 3000,
        type: "danger",
        textStyle: { color: "black", marginBottom: 20 },
        // buttonTextStyle: { color: "black" },
        buttonStyle: { backgroundColor: "red", marginBottom: 20 }
      });
    } else {
      const imageFilenameBeforeSplit = this.state.image.split("/");
      const imageFilename =
        imageFilenameBeforeSplit[imageFilenameBeforeSplit.length - 1];

      const data = new FormData();
      data.append("images", {
        uri: this.state.image,
        type: "image/jpeg",
        name: imageFilename
      });
      console.log(this.state.dateAnddTime, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<RRRRRRRRRRRRTTTT");
      console.log(this.state.chosenDate, "<<<<<<<<<<<<<<<<<EREREREERER");
      
      
      data.append("title", this.state.title);
      data.append("category", this.state.category);
      data.append("details", this.state.details);
      data.append("initialPrice", this.state.initialPrize);
      data.append("closedDate", this.state.dateAnddTime.toString());
      console.log(data, '@@@@')
      axios({
        method: "post",
        url: "/product",
        data,
        headers: {
          token: this.props.token,
          "content-type": "multipart/form-data"
        }
      })
        .then(({ data }) => {
          console.log(data);
          
          console.log("Masuk axios create Product");
          
          this.setState({ loading: false });
          this.props.getAllProducts(this.props.token);
          this.props.getMyProducts(this.props.token);
          dbh
            .collection("biding")
            .doc(`${data.bid._id}`)
            .set({
              bids: data.bid.bids,
              createdAt: data.bid.createdAt,
              productId: data.bid.productId,
              updatedAt: data.bid.updatedAt,
              winnerId: data.bid.winnerId
            });
          this.props.navigation.navigate("MyProduct", {
            id: "sdf"
          });
          console.log("masuk then sukses");
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(JSON.stringify(err, null, 2));
          console.log("masuk error");
        });
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri, imageMentah: result });
    }
  };

  handleViewRef = ref => (this.view = ref);
  animation = () => this.view.fadeInRight(300);

  render() {
    let { image } = this.state;
    return (
      <AnimatedKeyboardAvoiding
        ref={this.handleViewRef}
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={270}
        enabled={this.state.KeyboardView}
      >
        <NavigationEvents
          onWillBlur={this.animation}
          onWillFocus={this.animation}
        />
        <View
          style={{
            height: "25%",
            width: "90%",

            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableHighlight onPress={this._pickImage}>
              {image ? (
                <Image
                scale={0.2}
                  source={{ uri: image }}
                  style={{ width: 150, height: 150,  }}
                />
              ) : (
                <Ionicons name="ios-image" size={32} color="#EE5537" />
              )}
            </TouchableHighlight>
            {!image && <Text style={{ fontSize: 10, color : 'grey' }}>Upload Design</Text>}
          </View>
        </View>

        <View style={{ height: "100%", width: "90%" }}>
          <View style={{ width: "100%", height: "100%" }}>
            <Container>
              <Content>
                <Form style={{width:'100%'}}>
                  <Item>
                    <Input
                      placeholder="Title"
                      placeholderTextColor={'#B9B9B9'}
                      selectionColor={'#B9B9B9'}
                      onChangeText={text => this.setState({ title: text })}
                    />
                  </Item>
                  <Item>
                    <Input
                      placeholder="Category"
                      onChangeText={text => this.setState({ category: text })}
                      placeholderTextColor={'#B9B9B9'}
                      selectionColor={'#B9B9B9'}
                    />
                  </Item>
                  <Item>
                    <Input
                      placeholder="Initial Prize"
                      keyboardType="numeric"
                      placeholderTextColor={'#B9B9B9'}
                      selectionColor={'#B9B9B9'}
                      style={{color:'#B9B9B9'}}
                      onChangeText={text =>
                        this.setState({ initialPrize: String(Number(text.replace(/[^0-9]+/g, ''))) })
                      }
                      value={this.state.initialPrize}
                    />
                  </Item>

                  <Item>


                  <TouchableHighlight style={{flexDirection:'row'}} onPress={this.showDateTimePicker}>
                      {
                        this.state.dateAnddTime
                        ? 
                        <>
                          
                          <Text style={{marginTop:10, marginBottom : 10, marginLeft:12}}>{this.state.dateAnddTime}</Text>
                        </>
                        :
                        <>
                        <Ionicons name="md-calendar" size={32} color="#B9B9B9" style={{marginVertical : 10}}/>
                        <Text style={{marginTop:12, color: '#B9B9B9', marginLeft:12}}>Set Close Bid Date</Text>
                        </>
                      }
                  </TouchableHighlight>
                  </Item>
<<<<<<< HEAD
                
        
      
                
                  <Item>
                    <Text>{this.state.dateText}</Text>
                  </Item>
=======
>>>>>>> e0ed00a676dc9f45f7a2b2b824b859e398fc25aa
                  <Item>
                    <Textarea
                      onChangeText={text => this.setState({ details: text })}
                      style={{ width: "100%", marginTop: 10 }}
                      rowSpan={5}
                      placeholderTextColor={'#B9B9B9'}
                      selectionColor={'#B9B9B9'}
                      bordered
                      placeholder="Description"
                      onFocus={() => this.setState({ KeyboardView: true })}
                      onBlur={() => this.setState({ KeyboardView: false })}
                    />
                  </Item>
                  <Item style={{ width: "100%", marginTop: 10 }}>
                    <Button
                    rounded
                      onPress={this.submitCreate}
                      style={{ width: "90%", marginTop: 10,color:'white', backgroundColor:'#EE5537' }}
                      block
                      disabled={this.state.loading}
                    >
                      {!this.state.loading ? (
                        <Text>Create Product</Text>
                      ) : (
                        <Spinner />
                      )}
                    </Button>
                  </Item>
                  <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={'datetime'}
        />
                </Form>
              </Content>
            </Container>
          </View>
        </View>
      </AnimatedKeyboardAvoiding>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

const mapDispatchToProps = {
  getAllProducts,
  getMyProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  scrollContainer: {
    height: "34.5%",
    width: "100%",
    backgroundColor: "red"
  },
  image: {
    width,
    height
  }
});

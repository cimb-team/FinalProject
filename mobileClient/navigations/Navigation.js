import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import Products from "../screens/Products";
import MyProduct from "../screens/MyProduct";
import History from "../screens/History";
import Profile from "../screens/Profile";
import ProductDetails from "../screens/ProductDetails"

const HomeStack = createStackNavigator({
  ProductDetails: {
    screen: ProductDetails,
    navigationOptions: {
      header: null,
      headerTitle: "Product Details",
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  ProductList: {
    screen: Products,
    navigationOptions: {
      header: null,
      headerTitle: "Product",
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  
});

const MainNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-albums" color={tintColor} size={24} />
        )
      },
    },
    MyProduct: {
      screen: MyProduct,
      navigationOptions: {
        tabBarLabel: "MyProduct",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-apps" color={tintColor} size={24} />
        )
      }
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: "History",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-book" color={tintColor} size={24} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" color={tintColor} size={24} />
        )
      }
    }
  },

  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: 'lightblue',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: '#1F1F1F',
      },
    }
  }
);

export default createAppContainer(MainNavigator);

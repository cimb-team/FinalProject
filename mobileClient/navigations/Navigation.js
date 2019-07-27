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
import ProductDetail from "../screens/ProductDetail";

const MyProductNav = createStackNavigator({
  MyProduct: {
    screen: MyProduct,
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: "black"
      },
    }
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: {
      headerTitle: 'Product Detail',
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        color: 'black'
      }
    }
  }
});

const MainNavigator = createBottomTabNavigator(
  {
    Products: {
      screen: Products,
      navigationOptions: {
        tabBarLabel: "Products",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-albums" color={tintColor} size={24} />
        )
      },
    },
    MyProduct: {
      screen: MyProductNav,
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
    initialRouteName: "Products",
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

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Products from "../screens/Products";
import MyProduct from "../screens/MyProduct";
import History from "../screens/History";
import Topup from "../screens/Topup";
import Profile from "../screens/Profile";
import ProductDetail from "../screens/ProductDetail";
import SplashScreen from "../screens/SplashScreen";
import Signup from "../screens/Signup";
import Signin from "../screens/Signin";
import Filter from "../screens/Filter";
import Create from "../screens/CreateProduct";
// import { fromTop, fadeIn } from "react-navigation-transitions";

const MyProductNav = createStackNavigator({
  
  MyProduct: {
    screen: MyProduct,
    navigationOptions: { 
      header: null,
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  Create: {
    screen: Create,
    navigationOptions: {
      headerTitle: 'Create Product',
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        color: 'black'
      }
    }
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: {
      headerTitle: "Product Detail",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "black"
      }
    }
  },
  FilterMyproduct: {
    screen: Filter,
    navigationOptions: {
      headerTitle: "Search Result: My Product",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "black"
      }
    }
  },
  Create: {
    screen: Create,
    navigationOptions: {
      headerTitle: "Create Product",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "black"
      }
    }
  }
});

const ProductsNav = createStackNavigator({
  Products: {
    screen: Products,
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  FilterProduct: {
    screen: Filter,
    navigationOptions: {
      headerTitle: "Search Result",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "black"
      }
    }
  }
});

const ProfileNav = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  History: {
    screen: History,
    navigationOptions: {
      headerTitle: "History",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "black"
      }
    }
  },
  Topup: {
    screen: Topup,
    navigationOptions: {
      headerTitle: "Topup",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "black"
      }
    }
  }
});

// const MyprofileNav = createStackNavigator({
//   MyProfile: {
//     screen: Profile,
//     navigationOptions: {
//       header: null,
//       headerStyle: {
//         backgroundColor: "white"
//       },
//     }
//   },
//   // ProductDetail: {
//   //   screen: ProductDetail,
//   //   navigationOptions: {
//   //     headerTitle: 'Product Detail',
//   //     headerStyle: {
//   //       backgroundColor: "white",
//   //     },
//   //     headerTintColor: 'black',
//   //     headerTitleStyle: {
//   //       color: 'black'
//   //     }
//   //   }
//   // }
// });

const MainNavigator = createMaterialBottomTabNavigator(
  {
    Products: {
      screen: ProductsNav,
      navigationOptions: {
        tabBarLabel: "Products",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-albums" color={tintColor} size={24} />
        )
      }
    },
    MyProduct: {
      screen: MyProductNav,
      navigationOptions: {
        tabBarLabel: "My Product",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-apps" color={tintColor} size={24} />
        )
      }
    },
    Profile: {
      screen: ProfileNav,
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
      activeTintColor: "#EE5537",
      inactiveTintColor: "grey",
      labelStyle: {
        fontSize: 14
      },
      barStyle: { backgroundColor: "#FFFFFF" }
    
  }
);



const auth2 = createStackNavigator({
  SignIn: {
    screen: Signin,
    navigationOptions: {
      header: null,
    }
  },
  SignUp: {
    screen: Signup,
    navigationOptions: {
      header: null,
    }
  }
});

const Auth = createMaterialBottomTabNavigator(
  {
    Signup: {
      screen: Signup,
      navigationOptions: {
        tabBarLabel: "Signup",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" color={tintColor} size={24} />
        )
      }
    },
    Signin: {
      screen: Signin,
      navigationOptions: {
        tabBarLabel: "Signin",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-log-in" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: "Signin",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    
    barStyle: { backgroundColor: "#F3411E" },
    // transitionConfig: () => fromTop(1000)
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      Auth: auth2,
      App: MainNavigator
    },
    {
      initialRouteName: "Splash",
      // transitionConfig: () => fadeIn(1000)
    }
  )
);

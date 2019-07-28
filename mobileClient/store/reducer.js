const defaultValue = {
  token: null,
  allProducts: {
    loading: true,
    data: [],
    error: false
  },
  myProducts: {
    loading: true,
    data: [],
    error: false
  },
  productDetail: {
    loading: true,
    data: {},
    error: false
  },
  profile: {
    loading: true,
    data: {},
    error: false
  }
};

export default function reducer(state = defaultValue, action) {
  switch (action.type) {
    case "SUCCESS_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          loading: false,
          data: action.data
        }
      };
    case "ERROR_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          loading: false,
          error: action.error
        }
      };
    case "LOADING_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          loading: true
        }
      };
    case "SUCCESS_MY_PRODUCTS":
      return {
        ...state,
        myProducts: {
          ...state.myProducts,
          loading: false,
          data: action.data
        }
      };
    case "ERROR_MY_PRODUCTS":
      return {
        ...state,
        myProducts: {
          ...state.myProducts,
          loading: false,
          error: action.error
        }
      };
    case "LOADING_MY_PRODUCTS":
      return {
        ...state,
        myProducts: {
          ...state.myProducts,
          loading: true
        }
      };
    case "SUCCESS_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          loading: false,
          data: action.data
        }
      };
    case "ERROR_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          loading: false,
          error: action.error
        }
      };
    case "LOADING_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          loading: true
        }
      };
    case "SUCCESS_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          data: action.data
        }
      };
    case "ERROR_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: action.error
        }
      };
    case "LOADING_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true
        }
      };
    case "SUCCESS_TOKEN":
      return {
        ...state,
        token: action.data
      };
    // case "ERROR_FILTER":
    //   return {
    //     ...state,
    //     filterProducts: {
    //       data: [],
    //       loading: false,
    //       error: true
    //     }
    //   };
    // case "LOADING_FILTER":
    //   return {
    //     ...state,
    //     filterProducts: {
    //       data: [],
    //       loading: true,
    //       error: false
    //     }
    //   };
    // case "SUCCESS_FILTER":
    //   return {
    //     ...state,
    //     filterProducts: {
    //       data: action.data,
    //       loading: false,
    //       error: false
    //     }
    //   };
    default:
      return state;
  }
}

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
    error: false,
    function: false
  },
  profile: {
    loading: true,
    data: {},
    error: false
  },
  history: {
    loading: true,
    data: [],
    error: false
  }
};

export default function reducer(state = defaultValue, action) {
  switch (action.type) {
    case "SUCCESS_HISTORY":
      return {
        ...state,
        history: {
          ...state.history,
          loading: false,
          data: action.data
        }
      };
    case "ERROR_HISTORY":
      return {
        ...state,
        history: {
          ...state.history,
          loading: false,
          error: action.error
        }
      };
    case "LOADING_HISTORY":
      return {
        ...state,
        history: {
          ...state.history,
          loading: true
        }
      };
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
          data: action.data,
          function: true
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
          loading: true,
          function: false
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
    default:
      return state;
  }
}

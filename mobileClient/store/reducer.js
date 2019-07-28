const defaultValue = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkM2MyOTVkZDI3MjUwOGUwNmEwZWVlZSIsImVtYWlsIjoib3J2aW5AbWFpbC5jb20iLCJpYXQiOjE1NjQyMjM4NDZ9.e_-YQvnyMd4TB2lHzuv5ZqtZAlAmFOpInqujjMHf9No",
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
          loading: false,
          data: action.data
        }
      };
    case "ERROR_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: {
          loading: false,
          error: action.error
        }
      };
    case "LOADING_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: {
          loading: true
        }
      };
    case "SUCCESS_MY_PRODUCTS":
      return {
        ...state,
        myProducts: {
          loading: false,
          data: action.data
        }
      };
    case "ERROR_MY_PRODUCTS":
      return {
        ...state,
        myProducts: {
          loading: false,
          error: action.error
        }
      };
    case "LOADING_MY_PRODUCTS":
      return {
        ...state,
        myProducts: {
          loading: true
        }
      };
    case "SUCCESS_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: {
          loading: false,
          data: action.data
        }
      };
    case "ERROR_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: {
          loading: false,
          error: action.error
        }
      };
    case "LOADING_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: {
          loading: true
        }
      };

      case "SUCCESS_PROFILE":
        console.log(action.data)
        return {
          ...state,
          profile: {
            loading: false,
            data: action.data
          }
        };
      case "ERROR_PROFILE":
        return {
          ...state,
          profile: {
            loading: false,
            error: action.error
          }
        };
      case "LOADING_PROFILE":
        return {
          ...state,
          profile: {
            loading: true
          }
        };

    default:
      return state;
  }
}

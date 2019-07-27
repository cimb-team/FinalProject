
const defaultValue = {
  allProducts: {
    loading: true,
    data: [],
    error: false
  },
  name: "Designed by Orvin Savero",
  counter: 0,
  pagingCounter: 0,
  status: true,
  manga: {
    loading: true,
    data: [],
    error: {}
  },
  mangas: {
    loading: true,
    data: {},
    error: {}
  }
};

export default function reducer(state = defaultValue, action) {
  switch (action.type) {
    case "SUCCESS_ALL_PRODUCTS":
        console.log(action.data)
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
        manga: {
          loading: false,
          error: action.error
        }
      };
    case "LOADING_ALL_PRODUCTS":
      return {
        ...state,
        manga: {
          loading: true
        }
      };
    case "PAGE_COUNTER":
      return {
        ...state,
        pagingCounter: action.counterIncrement
      };
    case "ADD_COUNTER":
      return {
        ...state,
        counter: state.counter + action.counterIncrement
      };
    case "REMOVE_COUNTER":
      return {
        ...state,
        counter: state.counter - 1
      };
    case "SHOW_NAME":
      return {
        ...state,
        status: true
      };
    case "HIDE_NAME":
      return {
        ...state,
        status: false
      };

    case "SUCCESS_HIT_API2":
      return {
        ...state,
        mangas: {
          loading: false,
          data: action.data.data
        }
      };
    case "ERROR_HIT_API2":
      return {
        ...state,
        mangas: {
          loading: false,
          error: action.error
        }
      };
    case "LOADING_HIT_API2":
      return {
        ...state,
        mangas: {
          loading: true
        }
      };

    default:
      return state;
  }
}

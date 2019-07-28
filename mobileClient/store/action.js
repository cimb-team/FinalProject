import axios from "../axios";


export function getHistory(token) {
  return (dispatch, state) => {
    dispatch(loadingHistory());
    axios({
      method: "GET",
      url: `/user/history`,
      headers: { token: token }
    })
      .then(({ data }) => {
        console.log('@@@')
        console.log(data, 'history @@@@@ =====')
        dispatch({
          type: "SUCCESS_HISTORY",
          data
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_HISTORY",
          error
        });
      });
  };
}
export function loadingHistory() {
  return {
    type: "LOADING_HISTORY"
  };
}

export function getAllProducts(token) {
  return (dispatch, state) => {
    dispatch(loadingAllProducts());
    axios({
      method: "GET",
      url: `/product`,
      headers: { token: token }
    })
      .then(({ data }) => {
        dispatch({
          type: "SUCCESS_ALL_PRODUCTS",
          data
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_ALL_PRODUCTS",
          error
        });
      });
  };
}
export function loadingAllProducts() {
  return {
    type: "LOADING_ALL_PRODUCTS"
  };
}
export function getMyProducts(token) {
  return (dispatch, state) => {
    dispatch(loadingMyProducts());
    axios({
      method: "GET",
      url: `/product/user`,
      headers: { token: token }
    })
      .then(({ data }) => {
        dispatch({
          type: "SUCCESS_MY_PRODUCTS",
          data
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_MY_PRODUCTS",
          error
        });
      });
  };
}
export function loadingMyProducts() {
  return {
    type: "LOADING_MY_PRODUCTS"
  };
}

export function getProductDetail(token, id) {
  return (dispatch, state) => {
    dispatch(loadingProductDetail());
    axios({
      method: "GET",
      url: `/product/${id}`,
      headers: { token: token }
    })
      .then(({ data }) => {
        console.log(data)
        dispatch({
          type: "SUCCESS_PRODUCT_DETAIL",
          data
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_PRODUCT_DETAIL",
          error
        });
      });
  };
}
export function loadingProductDetail() {
  return {
    type: "LOADING_PRODUCT_DETAIL"
  };
}

export function getProfile() {
  return (dispatch, state) => {
    const token = state().token;
    dispatch(loadingProfile());
    return axios({
      method: "GET",
      url: `/user`,
      headers: { token: token }
    })
      .then(({ data }) => {
        dispatch({
          type: "SUCCESS_PROFILE",
          data
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_PROFILE",
          error
        });
      });
  };
}

export function setToken(token) {
  return {
    type: "SUCCESS_TOKEN",
    data: token
  };
}

export function loadingProfile() {
  return {
    type: "LOADING_PROFILE"
  };
}

export function toppingUp(value, token) {
  return (dispatch, state) => {
    axios({
      method: "PATCH",
      url: `/user/topup`,
      data: { balance: value },
      headers: { token: token },

    })
      .then(({ data }) => {
        dispatch(getProfile());
      })
      .catch(error => {
        dispatch({
          type: "ERROR_TOPUP",
          error
        });
      });
  };
}

export function bidding(value, token, id) {
  console.log(value, token, id);
  return (dispatch, state) => {
    axios({
      method: "PATCH",
      url: `/product/${id}/addbid`,
      data: { price: value },
      headers: { token: token },
    })
      .then(({ data }) => {
        console.log(data);
        dispatch(getProductDetail(token, id));
      })
      .catch(error => {
        dispatch({
          type: "ERROR_TOPUP",
          error
        });
      });
  };
}







export function pageCounter(number) {
  return (dispatch, state) => {
    dispatch(getMangas(number));
    dispatch({
      type: "PAGE_COUNTER",
      counterIncrement: number
    });
  };
}

export function addCounter(number) {
  return {
    type: "ADD_COUNTER",
    counterIncrement: number
  };
}

export function removeCounter() {
  return {
    type: "REMOVE_COUNTER"
  };
}
export function showName() {
  return {
    type: "SHOW_NAME"
  };
}
export function hideName() {
  return {
    type: "HIDE_NAME"
  };
}

export function getMangas(number) {
  return (dispatch, state) => {
    dispatch(loadingHitApi2());
    axios({
      method: "GET",
      url: `https://kitsu.io/api/edge/manga?page[limit]=10&page[offset]=number`
    })
      .then(({ data }) => {
        dispatch({
          type: "SUCCESS_HIT_API2",
          data
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_HIT_API2",
          error
        });
      });
  };
}
export function getGenre(genre) {
  return (dispatch, state) => {
    dispatch(loadingHitApi2());
    axios({
      method: "GET",
      url: `https://kitsu.io/api/edge/manga?filter[genres]=genre`
    })
      .then(({ data }) => {
        dispatch({
          type: "SUCCESS_HIT_API2",
          data
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_HIT_API2",
          error
        });
      });
  };
}

export function searchManga(title) {
  return (dispatch, state) => {
    dispatch(loadingHitApi2());
    axios({
      method: "GET",
      url: `https://kitsu.io/api/edge/manga?filter[text]=title`
    })
      .then(({ data }) => {
        dispatch({
          type: "SUCCESS_HIT_API2",
          data
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_HIT_API2",
          error
        });
      });
  };
}
export function loadingHitApi2() {
  return {
    type: "LOADING_HIT_API2"
  };
}

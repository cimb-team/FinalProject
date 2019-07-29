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
export function getProductDetail(token, id, cb) {
  return (dispatch, state) => {
    dispatch(loadingProductDetail());
    axios({
      method: "GET",
      url: `/product/${id}`,
      headers: { token: token }
    })
      .then(({ data }) => {
        dispatch({
          type: "SUCCESS_PRODUCT_DETAIL",
          data,
          cb
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
      headers: { token: token }
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

export function bidding(value, token, id) {;
  return (dispatch, state) => {
    axios({
      method: "PATCH",
      url: `/product/${id}/addbid`,
      data: { price: value },
      headers: { token: token }
    })
      .then(({ data }) => {
        // dispatch(getProductDetail(token, id));
      })
      .catch(error => {
        dispatch({
          type: "ERROR_TOPUP",
          error
        });
      });
  };
}

import axios from "axios";

export function getAllProducts() {
  console.log('action')
  return (dispatch, state) => {
    console.log('return')
    dispatch(loadingAllProducts());
    axios({
      method: "GET",
      url: `http://localhost:3000/product`,
      headers: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkM2MyOTVkZDI3MjUwOGUwNmEwZWVlZSIsImVtYWlsIjoib3J2aW5AbWFpbC5jb20iLCJpYXQiOjE1NjQyMjM4NDZ9.e_-YQvnyMd4TB2lHzuv5ZqtZAlAmFOpInqujjMHf9No'}
    })
      .then(({ data }) => {
        console.log('axios all products')
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
  console.log('loading all products')
  return {
    type: "LOADING_ALL_PRODUCTS"
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


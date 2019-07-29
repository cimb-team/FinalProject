import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import dbh from "../FBConfig";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // url: `http://localhost:3000`,
    url: "http://35.187.231.14",
    islogin: false,
    user: {},
    token: "",
    products: [],
    myProducts: [],
    categories: [],
    product: {},
    profile: {},
    history: []
  },
  mutations: {
    USERLOGIN(state, payload) {
      console.log(payload, "payload");
      state.user = payload;
      state.token = payload.token;
      state.islogin = true;
    },
    USERLOGOUT(state, payload) {
      state.user = {};
      state.token = "";
      state.islogin = false;
    },
    PROFILE(state, payload) {
      state.profile = payload;
    },
    HISTORY(state, payload) {
      state.history = payload;
    },
    ALLPRODUCTS(state, payload) {
      state.products = payload;
    },
    MYPRODUCTS(state, payload) {
      state.myProducts = payload;
    },
    FILTER(state, payload) {
      console.log(payload);
      state.categories = payload;
    },
    SEARCH(state, payload) {
      let arr = [];
      state.products.forEach(x => {
        if (x.title.toLowerCase().includes(payload.toLowerCase())) {
          arr.push(x);
        }
      });
      console.log(arr);
      state.products = arr;
    },
    CATEGORY(state, payload) {
      let arr = [];
      state.products.forEach(x => {
        if (x.category === payload) {
          arr.push(x);
        }
      });
      state.products = arr;
    },
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
    SET_ANSWERS(state, payload) {
      state.answers = payload;
    }
  },
  actions: {
    FETCH_HISTORY({ commit, state }, payload) {
      axios({
        method: "GET",
        url: `${state.url}/user/history`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          console.log(data);
          commit("HISTORY", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    FETCH_PROFILE({ commit, state }, payload) {
      axios({
        method: "GET",
        url: `${state.url}/user`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          console.log(data);
          commit("PROFILE", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    FETCH_MY_PRODUCTS({ commit, state }, payload) {
      axios({
        method: "GET",
        url: `${state.url}/product/user`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          commit("MYPRODUCTS", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    FETCH_ALL_PRODUCTS({ commit, state }, payload) {
      axios({
        method: "GET",
        url: `${state.url}/product`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          commit("ALLPRODUCTS", data);
          let arr = [];
          data.forEach(x => {
            if (arr.indexOf(x.category) === -1) {
              arr.push(x.category);
            }
          });
          commit("FILTER", arr);
          if (typeof payload === "string") {
            commit("CATEGORY", payload);
          } else if (payload.status == "search") {
            console.log("search store");
            commit("SEARCH", payload.value);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    FETCHPRODUCT({ commit, state }, payload) {
      axios({
        method: "GET",
        url: `${state.url}/product/${payload}`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          console.log(data);
          dbh
            .collection("biding")
            .doc(`${data.bid._id}`)
            .onSnapshot(function(doc) {
              console.log(doc.data(), "====");
              // setbidDariFirebase()
              if (doc.data()) {
                data.bid.bids = doc.data().bids;
              }

              commit("SET_PRODUCT", data);
            });
        })
        .catch(error => {
          console.log(error, "===");
        });
    }
  }
});

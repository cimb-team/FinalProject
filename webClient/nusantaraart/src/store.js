
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: `http://localhost:3000`,
    islogin: false,
    user: {},
    token: '',
    products: [],
    categories: [],
    answers: [],
    product: {}
  },
  mutations: {
    USERLOGIN (state, payload) {
      console.log(payload, 'payload')
      state.user = payload
      state.token = payload.token
      state.islogin = true
    },
    USERLOGOUT (state, payload) {
      state.user = {}
      state.token = ''
      state.islogin = false
    },
    ALLPRODUCTS (state, payload) {
      state.products = payload
    },
    FILTER (state, payload) {
      state.categories = payload
    },
    CATEGORY (state, payload) {
      let arr = []
      state.questions.forEach(x => {
        if (x.category === payload) {
          arr.push(x)
        }
      })
      state.questions = arr
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_ANSWERS (state, payload) {
      state.answers = payload
    }
  },
  actions: {
    FETCH_ALL_PRODUCTS ({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: `${state.url}/product`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('ALLPRODUCTS', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    FETCHPRODUCT ({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: `${state.url}/product/${payload}`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_PRODUCT', data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
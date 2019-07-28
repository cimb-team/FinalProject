
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
    question: {}
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
    SET_QUESTION (state, payload) {
      state.question = payload
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
    FETCHQUESTION ({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: `${state.url}/question?search=${payload}`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          commit('SET_QUESTION', data[0])
          return axios({
            method: 'GET',
            url: `${state.url}/answer/${payload}`,
            headers: {
              token: state.token
            }
          })
        })
        .then(({ data }) => {
          commit('SET_ANSWERS', data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
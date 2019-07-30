<template>
  <div>
    <div class="row">
      <div class="col">
        <div>
          <h2
            style="color:white;margin-top:30px;display:flex;justify-content:center;text-align:center"
          >Profile</h2>
        </div>
        <div style="display:flex;justify-content:center">
          <div class="card" style="width: 18rem;margin-top:10px;padding:30px;text-align:center;background-color:#FFFFFF30;border-radius:5px;color:white">
            <div style="display:flex;justify-content:center">
              <img
                :src="profile.image"
                style="border-radius:150px;width:80%"
                class="card-img-top"
                alt="..."
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ profile.name }}</h5>
              <p class="card-text">
                <strong>Phone:</strong>
                <br />
                {{ profile.phonenumber }}
              </p>
              <p class="card-text">
                <strong>Email:</strong>
                <br />
                {{ profile.email }}
              </p>
              <p class="card-text">
                <strong>Balance:</strong>
                <br />
                {{ profile.balance }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div
          style="display:flex;justify-content:center;flex-direction:column;margin-bottom:10px;width:70%"
        >
          <h2
            style="color:white;margin-top:30px;display:flex;justify-content:center;text-align:center"
          >Top-Up</h2>
        </div>
        <div style="display:flex;flex-direction:column;justify-content:center">
          <div class="card" style="width: 70%;background-color:#FFFFFF30;border-radius:5px;color:white">
            <div class="card-body">
              <h3 style="text-align:center">
                <strong>Balance:</strong>
                <br />
                Rp. {{ profile.balance }}
              </h3>
            </div>
          </div>
          <div class="card" style="width: 70%;padding:10px;background-color:#FFFFFF30;border-radius:5px;color:white">
            <div class="card-body">
              <label for="exampleInputPassword1" style="color:white">Add balance:</label>
              <input
                v-model="money"
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="$"
              />
              <div style="display:flex;justify-content:center;margin-top:20px">
                <button
                  @click="add"
                  type="button"
                  style="border-radius:10px"
                  class="btn btn-primary"
                >Transfer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col" style="display:flex;flex-direction:column">
        <div style="display:flex;justify-content:center;flex-direction:column;margin-bottom:20px">
          <h2
            style="color:white;margin-top:30px;display:flex;justify-content:center;text-align:center"
          >History</h2>
        </div>
        <div style="display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center">
          <div v-for="data in history" :key="data._id">
            
            <div
              class="card text-black mb-3"
              style="width: 18rem;height:25rem;padding:15px;margin-top:10px;background-color:#FFFFFF30;border-radius:5px;color:white"
            >
              <h5 class="card-title" style="text-align:center">{{ data.productId.title }}</h5>
              <img :src="data.productId.images[0]" class="card-img-top" alt="..." />
              <div class="card-body">
              
                <p class="card-text">Initial Price: {{ data.productId.initialPrice }}</p>
                <p
                  v-if="data.bids"
                  class="card-text"
                >Last Price: {{ data.bids[data.bids.length-1].price }}</p>
                <p class="card-text">Status: {{ data.productId.status }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "home",
  props: ["islogin"],
  data() {
    return {
      money: ""
    };
  },
  components: {},
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    history() {
      return this.$store.state.history;
    },
    url() {
      return this.$store.state.url;
    },
    token() {
      return this.$store.state.token;
    }
  },
  methods: {
    ...mapActions(["FETCH_PROFILE"]),
    ...mapActions(["FETCH_HISTORY"]),
    add() {
      axios({
        method: "PATCH",
        url: `${this.url}/user/topup`,
        data: { balance: this.money },
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          this.FETCH_PROFILE();
          this.money = "";
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.FETCH_PROFILE();
    this.FETCH_HISTORY();
  }
};
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>

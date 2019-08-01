<template>
  <div>
    <div
      class="row"
      style="display:flex;justify-content:space-evenly;align-items:flex-start;margin-top:5%"
    >
      <div class>
        <div>
          <h2
            style="text-shadow:1px 1px black;color:white;margin-top:30px;display:flex;justify-content:center;text-align:center"
          >Profile</h2>
        </div>
        <div style="display:flex;justify-content:center">
          <div
            class="card"
            style="width: 18rem;margin-top:10px;padding:30px;text-align:center;background-color:#FFFFFF;border-radius:5px;color:black"
          >
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
                {{ format(Number(profile.balance)) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class style="display:flex;justify-content:center;flex-direction:column">
        <div>
          <h2
            style="text-shadow:1px 1px black;color:white;margin-top:30px;display:flex;justify-content:center;text-align:center"
          >Top-Up</h2>
        </div>

        <div
          class="card"
          style="width: 18rem;margin-top:10px;padding:30px;text-align:center;background-color:#FFFFFF;border-radius:5px;color:black"
        >
          <div class="card-body">
            <h4 style="text-align:center">
              <strong>Balance:</strong>
              <br />
              {{ format(Number(profile.balance)) }}
            </h4>
          </div>
        </div>

        <div
          class="card"
          style="width: 18rem;margin-top:10px;padding:30px;text-align:center;background-color:#FFFFFF;border-radius:5px;color:black"
        >
          <div class="card-body">
            <label for="exampleInputPassword1" style="color:black">Add balance:</label>
            <input
              v-model="money"
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Rp."
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
              style="width: 18rem;padding:15px;margin-top:10px;background-color:#FFFFFF;border-radius:5px;color:black"
            >
              <h5 class="card-title" style="text-align:center">{{ data.productId.title }}</h5>
              <div class>
                <li
                  class="list-group-item"
                  style="border-radius:5px;background-color:white;color:black"
                >
                  <p
                    class="card-text"
                  >Initial Price: {{format(Number( data.productId.initialPrice)) }}</p>
                  <p
                    v-if="data.bids"
                    class="card-text"
                  >Last Price: {{ format(Number(data.bids[data.bids.length-1].price)) }}</p>
                  <p class="card-text">Status: {{ data.productId.status }}</p>
                  <p
                    v-if="data.productId.status == 'close' && data.winnerId != profile._id"
                    class="card-text"
                    style="color:red"
                  ><strong>You lose</strong></p>
                  <p
                    v-if="data.productId.status == 'close' && data.winnerId == profile._id"
                    class="card-text"
                    style="color:green"
                  ><strong>You won the auction!</strong></p>
                  <p
                    v-if="data.productId.status == 'open'"
                    class="card-text"
                    style="color:blue"
                  ><strong>Auction is still ongoing</strong></p>
                </li>
              </div>
              <img
                :src="data.productId.images[0]"
                style="border:2px solid black;margin-top:10px"
                class="card-img-top"
                alt="..."
              />
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
import Swal from "sweetalert2";
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
    format(num) {
      var p = num.toFixed(2).split(".");
      return (
        "Rp. " +
        p[0]
          .split("")
          .reverse()
          .reduce(function(acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
          }, "") +
        "," +
        p[1]
      );
    },
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
          Swal.fire({
            title: "Success!",
            text: `${this.format(
              Number(this.money)
            )} has been added to you balance!`
          });
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

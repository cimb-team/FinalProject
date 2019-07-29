<template>
  <div style="display:flex;flex-direction:column">
    TOPUP
    <br />
    <h3>{{ profile.balance }}</h3>
    <label for="exampleInputPassword1">Topup</label>
    <input
      v-model="money"
      type="text
    "
      class="form-control"
      id="exampleInputPassword1"
      placeholder="$"
    />
    <button @click="add" type="button" class="btn btn-primary">TOPUP</button>
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
    url() {
      return this.$store.state.url;
    },
    token() {
      return this.$store.state.token;
    }
  },
  methods: {
    ...mapActions(["FETCH_PROFILE"]),
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
  }
};
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>

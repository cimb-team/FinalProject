<template>
  <div style="display:flex">
    <div class="card" style="width: 18rem;">
      <img :src="profile.image" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{profile.name}}</h5>
        <p
          class="card-text"
        >{{profile.phonenumber}}</p>
         <p
          class="card-text"
        >{{profile.email}}</p>
         <p
          class="card-text"
        >{{profile.balance}}</p>
         <router-link v-if="islogin" to="/history">
        <a href="#" style="margin-right: 10px" class="btn btn-primary">History</a>   </router-link>

          <router-link v-if="islogin" to="/topup">
        <a href="#" class="btn btn-primary">Topup</a>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "home",
  props: ["islogin"],
  data() {
    return {};
  },
  components: {
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    ...mapActions(["FETCH_PROFILE"])
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
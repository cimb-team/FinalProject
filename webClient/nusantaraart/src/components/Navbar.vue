<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: 	#FF8C00;">

    <a v-if="!islogin" class="navbar-brand" style="cursor:pointer;color:white"
      >Nusantara Art</a
    >
    <router-link v-if="islogin" to="/products">
      <a
        @click="FETCH_ALL_PRODUCTS"
        class="navbar-brand"
        style="cursor:pointer;color:white;font-size: 18px"
        ><i class="fa fa-fw fa-home"></i> Home</a
      >
    </router-link>
  <button style="background-color:white" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
    <div
      v-if="islogin"
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link v-if="islogin" to="/myproducts">
            <a class="navbar-brand" style="font-size: 18px; color: white"
              > <i class="fa fa-fw fa-camera-retro"></i> My Arts <span class="sr-only">(current)</span></a
            >
          </router-link>
        </li>
                <li class="nav-item active">
          <router-link v-if="islogin" to="/sell">
            <a class="navbar-brand" style="font-size: 18px; color: white"
              > <i class="fa fa-fw fa-plus-square"></i> Sell <span class="sr-only">(current)</span></a
            >
          </router-link>
        </li>
        <li class="nav-item active">
          <router-link v-if="islogin" to="/profile">
            <a class="navbar-brand" style="font-size: 18px; color: white"
              ><i class="fa fa-fw fa-user-circle"></i> Profile <span class="sr-only">(current)</span></a
            >
          </router-link>
        </li>
      </ul>
      <router-link to="/">
        <button
          class="btn btn-light"
          style="border-radius: 20px"
          type="submit"
          v-on:click="logout"
        >
        <i class="fa fa-fw fa-sign-out"></i>
          Logout
        </button>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "navbar",
  props: ["islogin"],
  components: {},
  methods: {
    logout() {
      this.$store.commit("USERLOGOUT");
      localStorage.clear();
    },
    ...mapActions(["FETCH_ALL_PRODUCTS"])
  },
  created (){
  }
};
</script>

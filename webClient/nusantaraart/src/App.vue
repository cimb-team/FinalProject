<template>
  <div id="app">
    <Navbar v-if="this.$router.history.current.name !== 'my-3d-detail'" :islogin="islogin"></Navbar>
    <router-view style="margin:0px" :islogin="islogin" />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import { mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Navbar
  },
  computed: {
    islogin() {
      return this.$store.state.islogin;
    }
  },
  watch: {},
  methods: {
    ...mapActions(["FETCHQUESTIONS"])
  },
  created() {
    console.log(this.$route.params)

        console.log(this.$route)
    console.log(this.$router)
    if (localStorage.getItem("@nusantara-token")) {
      console.log('@@@@@')
      this.$store.commit("USERLOGIN", JSON.parse(localStorage.getItem("user")));
      console.log(this.$router.history.fullPath)

      this.$router.push(this.$router.history.fullPath);
    } else {
      localStorage.clear();
      this.$store.commit("USERLOGOUT", localStorage);
      this.$router.push("/");
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

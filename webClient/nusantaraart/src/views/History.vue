<template>
  <div style="display:flex;flex-direction:column">
    HISTORY
    <div class="col-4" v-for="data in history" :key="data._id">
      <div class="card" style="width: 18rem;">
        <img :src="data.productId.images[0]" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ data.productId.title }}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
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
    ...mapActions(["FETCH_HISTORY"])
  },
  created() {
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

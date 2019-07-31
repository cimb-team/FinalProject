<template>
  <div class="row" style="display:flex; flex-wrap:wrap;flex-direction:row;">

    <div class="col" style v-if="islogin">
      <h2 style="text-align:center;color:white;margin-bottom:30px;margin-top:5%;text-shadow:1px 1px black">My Arts</h2>

      <div style="display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center">
        <div class v-for="product in myProducts" :key="product._id">
          <Card :product="product"></Card>
        </div>
        <p v-if="myProducts.length == 0" style="color:white;text-align:center">No Arts Yet</p>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import { mapActions } from "vuex";
import format from "../../helpers/format"
import axios from "axios";
import dbh from "../../FBConfig";
export default {
  name: "home",
  props: ["islogin"],
  data() {
    return {

    };
  },
  components: {
    Card,
  },
  computed: {
    myProducts() {
                  let temp = this.$store.state.myProducts;
       temp.forEach((x, i) => {
         temp[i].initialPrice = format(Number(x.initialPrice))
       })
      return temp
    },
    url() {
      return this.$store.state.url;
    },
    token() {
      return this.$store.state.token;
    }
  },
  methods: {
    ...mapActions(["FETCH_MY_PRODUCTS"]),

  },
  created() {
    console.log('MY PRODUCTS')
    this.FETCH_MY_PRODUCTS();
  }
};
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
label {
  color: white;
}
</style>

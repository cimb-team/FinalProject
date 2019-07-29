<template>
  <div style="display:flex">
    <div class="col-9" v-if="islogin">
      <h2 style="text-align:center">My Products</h2>
      <br />
      <div style="display:flex;flex-direction:row;flex-wrap:wrap;">
        <div class="col-4" v-for="product in myProducts" :key="product._id">
          <Card :product="product"></Card>
        </div>
      </div>
    </div>
    <div class="col-3" v-if="islogin">
      <h2 style="text-align:center">Categories</h2>
      <div class="card text-white bg-dark mb-3" style="width: 18rem;margin-top:30px">
        <ul class="list-group list-group-flush" style="padding:20px">
          <div>
            <li class="list-group-item" style="border-radius:10px;margin-bottom:5px;">
                <div
                  style="cursor:pointer;color:black"
                >Art</div>
            </li>
          </div>
                    <div>
            <li class="list-group-item" style="border-radius:10px;margin-bottom:5px;">
                <div
                  style="cursor:pointer;color:black"
                >Art</div>
            </li>
          </div>
                    <div>
            <li class="list-group-item" style="border-radius:10px;margin-bottom:5px;">
                <div
                  style="cursor:pointer;color:black"
                >Art</div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import { mapActions } from "vuex";
export default {
  name: "home",
  props: ["islogin"],
  data() {
    return {};
  },
  components: {
    Card
  },
  computed: {
    myProducts() {
      return this.$store.state.myProducts;
    }
  },
  methods: {
    ...mapActions(["FETCH_MY_PRODUCTS"])
  },
  created() {
    this.FETCH_MY_PRODUCTS();
  }
};
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>
<template>
  <div style="">
    <div class="row" style="margin-top:5%">
      <div class="col-sm" style="display:flex;justify-content:center;align-items:center">
        <div style="display:flex;text-align:center;color:white;margin-top:10px">
          <h1 style="font-weight:700 ;color:#FF8C00">N</h1>
          <h1 style="font-weight:700 ;color:#FF9A1F">u</h1>
          <h1 style="font-weight:700 ;color:#FFA83F">s</h1>
          <h1 style="font-weight:700 ;color:#FFB75F">a</h1>
          <h1 style="font-weight:700 ;color:#FFC57F">n</h1>
          <h1 style="font-weight:700 ;color:#FFD39F">t</h1>
          <h1 style="font-weight:700 ;color:#FFE2BF">a</h1>
          <h1 style="font-weight:700 ;color:#FFF0DF">r</h1>
          <h1 style="font-weight:700 ;color:#FFFFFF">a &nbsp;</h1>
          <h1 style="font-weight:700 ;color:#FFFFFF">A</h1>
          <h1 style="font-weight:700 ;color:#FFFFFF">r</h1>
          <h1 style="font-weight:700 ;color:#FFFFFF">t</h1>
        </div>
        <img
          src="https://storage.googleapis.com/orvin-savero/15644071751275856e9c3-7102-479c-9d89-b7f83f228562.png"
          style="margin-left:20px;width:60px;height:60px;border-radius:20px"
        />
      </div>
    </div>

    <div class="row" style="margin-top: 15px">
      <div class="col-sm"></div>
      <div class="col-sm" style="display:flex">
        <input
          type="text"
          v-model="search.value"
          class="form-control"
          id="searchHome"
          placeholder="Search Arts.."
          style="margin-right:10px;border-radius:10px"
        />
        <button
          style="border-radius:10px"
          @click="FETCH_ALL_PRODUCTS(search)"
          type="button"
          class="btn btn-light"
        >Search</button>
      </div>
      <div class="col-sm"></div>
    </div>

    <div v-if="!searchs" class="row" style="margin-top: 30px">
      <div class="col-2"></div>
      <div class="col">
        <div class="bd-example" style="display:flex;justify-content:center;margin-top:20px">
          <div id="carouselExampleCaptions" style="max-width:600px;max-heigth:200px;" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  :src="'https://storage.googleapis.com/orvin-savero/1564552676569melvin-tan-VO1EisKqdEE-unsplash.jpg'"
                  class="d-block w-100"
                  style="width:200px;max-height: 300px"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Mt. Bromo</h5>
                  <p>Mount Bromo, is an active volcano and part of the Tengger massif, in East Java, Indonesia.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  :src="'https://storage.googleapis.com/orvin-savero/1564568990550david-wollschlegel-dRi6xP2ZPBk-unsplash.jpg'"
                  class="d-block w-100"
                  style="width:200px;max-height: 300px"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Toba Lake</h5>
                  <p>Lake Toba is a large natural lake in Sumatra, Indonesia occupying the caldera of a supervolcano. </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  :src="'https://storage.googleapis.com/orvin-savero/1564569080296jeremy-bishop-QUwLZNchflk-unsplash.jpg'"
                  class="d-block w-100"
                  style="width:200px;max-height: 300px"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Bali</h5>
                  <p>Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.</p>
                </div>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row" style="margin-top:30px">
      <div class="col" style="display:flex;justify-content:center;align-items:center">
        <h3 style="font-weight:700 ;color:white;text-align:center">Categories</h3>
      </div>

    </div>
          <div
        class="row"
        style="display:flex;margin-top: 10px;justify-content:center;padding-left:80px;padding-right:80px"
      >
        <div v-for="category in categories" :key="category" style>
          <button
            @click="FETCH_ALL_PRODUCTS(category)"
            type="button"
            style="margin:5px;width:100px;border-radius:10px"
            class="btn btn-light"
          >{{ category }}</button>
        </div>
      </div>
     <div class="col" style="display:flex;justify-content:center;align-items:center;margin-top:20px">
        <h3 style="font-weight:700 ;color:white;text-align:center">Arts</h3>
      </div>
    <div class="col" style="margin-top:0px">
      <br />
      <div style="display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center">
        <div class="" v-for="product in products" :key="product._id">
          <Card :product="product"></Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import format from "../../helpers/format"
import Card from "@/components/Card.vue";
import { mapActions } from "vuex";
export default {
  name: "home",
  props: ["islogin"],
  data() {
    return {
      search: {
        status: "search",
        value: ""
      }
    };
  },
  components: {
    Card
  },
  computed: {
    searchs() {
      return this.$store.state.search;
    },
    products() {
            let temp = this.$store.state.products;
       temp.forEach((x, i) => {
         temp[i].initialPrice = format(Number(x.initialPrice))
       })
      return temp
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    ...mapActions(["FETCH_ALL_PRODUCTS"])
  },
  created() {
    this.FETCH_ALL_PRODUCTS();
  }
};
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>

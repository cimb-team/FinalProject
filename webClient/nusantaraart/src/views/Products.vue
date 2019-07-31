<template>
  <div style>
    <div class="row">
      <div class="col-sm" style="display:flex;justify-content:center;align-items:center">
        <div style="display:flex;text-align:center;color:white;;margin-top:10px">
          <h1 style="font-weight:700 ;color:#E51500">N</h1>
          <h1 style="font-weight:700 ;color:#EA4333">u</h1>
          <h1 style="font-weight:700 ;color:#EC5B4C">s</h1>
          <h1 style="font-weight:700 ;color:#EF7266">a</h1>
          <h1 style="font-weight:700 ;color:#F28A7F">n</h1>
          <h1 style="font-weight:700 ;color:#F4A199">t</h1>
          <h1 style="font-weight:700 ;color:#F7B8B2">a</h1>
          <h1 style="font-weight:700 ;color:#F7BFB9">r</h1>
          <h1 style="font-weight:700 ;color:#FCE9E7">a &nbsp;</h1>
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
        <div class="bd-example">
          <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  :src="'https://i.pinimg.com/originals/5a/76/4e/5a764e1ec61b41b0dd664b00bfc1fcc3.jpg'"
                  class="d-block w-100"
                  style="width:200px;max-height: 400px"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  :src="'https://pm1.narvii.com/6855/cfd7568fbf550bc8f40a8d55cd6f4d7eb3311ad3v2_hq.jpg'"
                  class="d-block w-100"
                  style="width:200px;max-height: 400px"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  :src="'https://image.freepik.com/free-vector/logo-ninja-assasin_60267-219.jpg'"
                  class="d-block w-100"
                  style="width:200px;max-height: 400px"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
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
      <div
        class="row"
        style="display:flex;margin-top: 10px;justify-content:center;padding-left:80px;padding-right:80px"
      >
        <div v-for="category in categories" :key="category" style>
          <button
            @click="FETCH_ALL_PRODUCTS(category)"
            type="button"
            style="margin:5px;width:100px;border-radius:10px"
            class="btn btn-secondary"
          >{{ category }}</button>
        </div>
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
      return this.$store.state.products;
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

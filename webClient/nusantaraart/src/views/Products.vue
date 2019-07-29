<template>
  <div style>
    <div class="row">
      <div class="col-sm" style="display:flex;justify-content:center;align-items:center">
        <h1 style="text-align:center;color:white;font-weight:700;margin-top:10px">Nusantara Art</h1>
        <img
          src="https://storage.googleapis.com/orvin-savero/15644071751275856e9c3-7102-479c-9d89-b7f83f228562.png"
          style="margin-left:20px;width:60px;height:60px;border-radius:20px"
        />
      </div>
    </div>
    <div class="row" style="margin-top: 20px">
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

    <div class="row" style="margin-top: 50px">
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
                  :src="products[4].images[0]"
                  class="d-block w-100"
                  style="width:200px;height: 400px"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  :src="products[5].images[0]"
                  class="d-block w-100"
                  style="width:200px;height: 400px"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  :src="products[6].images[0]"
                  class="d-block w-100"
                  style="width:200px;height: 400px"
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
    <div class="col" style="margin-top:20px">
      <br />
      <div style="display:flex;flex-direction:row;flex-wrap:wrap;">
        <div class="col-3" v-for="product in products" :key="product._id">
          <Card :product="product"></Card>
        </div>
      </div>
    </div>
    <div class="col-3" v-if="islogin">
      <h2 style="text-align:center">Categories</h2>
      <div class="card text-white bg-dark mb-3" style="width: 18rem;margin-top:30px">
        <ul class="list-group list-group-flush" style="padding:20px">
          <div v-for="category in categories" :key="category">
            <li
              class="list-group-item"
              style="border-radius:10px;margin-bottom:5px;"
              @click="FETCH_ALL_PRODUCTS(category)"
            >
              <div style="cursor:pointer;color:black">{{ category }}</div>
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

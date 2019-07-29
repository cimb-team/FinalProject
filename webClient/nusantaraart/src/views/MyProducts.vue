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
      <form @submit.prevent="create">
        <div v-if="error.create.length != 0" id="errorCreate">
          <p class="error" style="color:red;">{{ error.create }}</p>
        </div>
        <div class="form-group">
          <label for="nameCreate">Title</label>
          <input
            v-model="product.title"
            type="text"
            class="form-control"
            id="nameCreate"
            placeholder="Title"
            required
          />
        </div>
        <div class="form-group">
          <label for="categoryCreate">Category</label>
          <input
            v-model="product.category"
            type="text"
            class="form-control"
            id="categoryCreate"
            placeholder="Category"
            required
          />
        </div>
        <label for="imageCreate">Upload Image</label>
        <div id="imageCreate" class="container" style="margin-bottom: 30px">
          <div class="container">
            <picture-input
              ref="pictureInput"
              width="100"
              height="100"
              :custom-strings="{
                upload: '<h1>Bummer!</h1>',
                drag: `<img
            style='height: 80px;width:80px;'
            src='http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Camera-Next-icon.png'
            alt='Card image cap'
          >`
              }"
            ></picture-input>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="priceCreate">Initial Price</label>
            <input
              v-model="product.price"
              type="text"
              class="form-control"
              id="priceCreate"
              placeholder="Initial Price"
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label for="quantityCreate">Closed Date</label>
            <input
              v-model="product.closedDate"
              type="date"
              class="form-control"
              id="quantityCreate"
              placeholder="Closed Date"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="descCreate">Details</label>
          <textarea
            v-model="product.details"
            class="form-control"
            id="descCreate"
            rows="6"
            placeholder="Details"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-success">Create</button>
      </form>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import { mapActions } from "vuex";
import PictureInput from "vue-picture-input";
import axios from "axios";
import dbh from "../../FBConfig";
export default {
  name: "home",
  props: ["islogin"],
  data() {
    return {
      product: {
        title: "",
        category: "",
        image: "",
        initialPrice: "",
        closedDate: "",
        details: ""
      },
      error: {
        create: ""
      }
    };
  },
  components: {
    Card,
    PictureInput
  },
  computed: {
    myProducts() {
      return this.$store.state.myProducts;
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
    create() {
      console.log(this.product);
      let newImage = new FormData();
      console.log(this.$refs.pictureInput.file);
      newImage.append("title", this.product.title);
      newImage.append("initialPrice", this.product.initialPrice);
      newImage.append("details", this.product.details);
      newImage.append("closeDate", this.product.closedDate);
      newImage.append("category", this.product.category);
      newImage.append("images", this.$refs.pictureInput.file);
      axios({
        method: "POST",
        url: `${this.url}/product`,
        headers: {
          token: this.token
        },
        data: newImage
      })
        .then(({ data }) => {
          dbh
            .collection("biding")
            .doc(`${data.bid._id}`)
            .set({
              bids: data.bid.bids,
              createdAt: data.bid.createdAt,
              productId: data.bid.productId,
              updatedAt: data.bid.updatedAt,
              winnerId: data.bid.winnerId
            });
          this.FETCH_MY_PRODUCTS();
        })
        .catch(error => {
          this.error.create = error.response.data.message;
          console.log(error.response);
        });
    }
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

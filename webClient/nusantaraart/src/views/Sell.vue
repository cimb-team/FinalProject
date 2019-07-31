<template>
  <div style="display:flex;justify-content:center">
    <div class style="width:600px;margin-top:5%" v-if="islogin">
      <h2 style="color:white;text-align:center;margin-bottom:30px;text-shadow:1px 1px black">Let's sell!</h2>
      <div
        class="card text-black mb-3"
        style="width: 100%;cursor:pointer;border-radius:5px;padding:50px;background-color:#FFFFFF"
        v-on:click="detail(product._id)"
      >
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
              <picture-input ref="pictureInput" width="100" height="100" :custom-strings="custom"></picture-input>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="priceCreate">Initial Price</label>
              <input
                v-model="product.initialPrice"
                type="text"
                class="form-control"
                id="priceCreate"
                placeholder="Initial Price"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="quantityCreate">Close Date</label>
              <input
                v-model="product.closedDate"
                type="date"
                class="form-control"
                id="quantityCreate"
                placeholder="Close Date"
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
          <div style="display:flex;justify-content:center;margin-top:50px">
            <button
              type="submit"
              class="btn btn-primary"
              style="border-radius:10px;width:100px;text-align:center"
            >Sell Now!</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import PictureInput from "vue-picture-input";
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
      },
      custom: {
        upload: "<h1>Bummer!</h1>",
        drag: `<img
            style='height: 80px;width:80px;'
            src='http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Camera-Next-icon.png'
            alt='Card image cap'
          >`
      }
    };
  },
  components: {
    PictureInput
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    url() {
      return this.$store.state.url;
    },
    token() {
      return this.$store.state.token;
    }
  },
  methods: {
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
      console.log(this.token)
            console.log(this.url)
      axios({
        method: "POST",
        url: `${this.url}/product`,
        headers: {
          token: this.token
        },
        data: newImage
      }).then(({ data }) => {
          console.log('=====')
          this.product.title = "";
          this.product.category = "";
          this.product.image = "";
          this.product.initialPrice = "";
          this.product.closedDate = "";
          this.product.details = "";
          console.log(this.$refs.pictureInput);
          this.$refs.pictureInput = null;
          dbh
            .collection("biding")
            .doc(`${data.bid._id}`)
            .set({
              bids: data.bid.bids,
              createdAt: data.bid.createdAt,
              productId: data.bid.productId,
              updatedAt: data.bid.updatedAt,
              winnerId: data.bid.winnerId
            })
            .then(() => {
              console.log('then router')
              this.$router.push("/products");
            });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  },
  created() {}
};
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
label {
  color: black;
}
</style>
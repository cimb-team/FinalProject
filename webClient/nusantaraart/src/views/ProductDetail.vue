<template>
  <div>
    <div style="display:flex" v-if="product.userId != 0">
      <div
        class="card text-white bg-dark mb-3"
        style="width: 600px;"
        v-if="product.userId != undefined"
      >
        <div style="margin:20px">
          <img
            style="max-width:100%;height:auto;width:auto;max-height:230px"
            class="card-img-top"
            v-bind:src="product.images[0]"
            alt="Card image cap"
          />
        </div>

        <div class="card-header" style="height:47px">Category: {{ product.category }}</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>{{ product.details }}</p>
            <footer class="blockquote-footer">
              <small
                style="color:white"
              >By {{ product.userId.name }} at {{ product.createdAt.slice(0,10) }}</small>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
    <input
      v-model="value"
      type="text
    "
      class="form-control"
      id="exampleInputPassword1"
      placeholder="$"
    />
    <button @click="addBid" type="button" class="btn btn-primary">BID</button>
    <div v-if="product.bid">
      <div v-for="bid in product.bid.bids" :key="bid._id">{{bid}}</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "product-detail",
  props: ["islogin"],
  data() {
    return {
      value: ""
    };
  },
  components: {},
  computed: {
    url() {
      return this.$store.state.url;
    },
    product() {
      return this.$store.state.product;
    },
    token() {
      return this.$store.state.token;
    }
  },
  methods: {
    ...mapActions(["FETCHPRODUCT"]),
    addBid() {
      console.log(this.product._id, "====");
      console.log(this.token)
      console.log(this.value)
      axios({
        method: "PATCH",
        url: `${this.url}/product/${this.product._id}/addbid`,
        data: { price: this.value },
        headers: { token: this.token }
      })
        .then(({ data }) => {
          this.value = ""
          this.FETCHPRODUCT(this.$route.params.id);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.FETCHPRODUCT(this.$route.params.id);
  }
};
</script>
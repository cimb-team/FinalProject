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
              >By {{ product.userId }} at {{ product.createdAt.slice(0,10) }}</small>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "product-detail",
  props: ["islogin"],
  data() {
    return {};
  },
  components: {},
  computed: {
    url() {
      return this.$store.state.url;
    },
    product() {
      return this.$store.state.product;
    }
  },
  methods: {
    ...mapActions(["FETCHPRODUCT"])
  },
  created() {
    this.FETCHPRODUCT(this.$route.params.id);
  }
};
</script>
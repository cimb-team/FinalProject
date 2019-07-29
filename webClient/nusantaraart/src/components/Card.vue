<template>
  <div
    class="card text-white bg-dark mb-3"
    style="width: 300px;cursor:pointer"
    v-on:click="detail(product._id)"
  >
    <div class="card-header" style="height:47px">{{ product.title }}</div>
    <div
      style="padding:5px;border-radius:5px;box-shadow: 0px 0px 2px 0px;margin:20px;height: 250px; width: 245px; display:flex;align-items:center;justify-content:center"
    >
      <div style="margin:20px">
        <img
          style="max-width:100%;height:auto;width:auto;max-height:230px"
          class="card-img-top"
          v-bind:src="product.images[0]"
          alt="Card image cap"
        />
      </div>
    </div>
    <div class="card-body" style="color:black">
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          style="border-radius:10px;margin-bottom:5px;background-color:lightgrey"
        >
          Category: {{ product.category }}
        </li>
        <li
          class="list-group-item"
          style="border-radius:10px;margin-bottom:5px"
        >
          {{ product.details }}
        </li>
        <li
          class="list-group-item"
          style="border-radius:10px;margin-bottom:5px"
        >
          <small>
            created at: {{ product.createdAt }} by: {{ product.userId.name }}
          </small>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "home-card",
  props: ["product"],
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    detail(id) {
      this.$router.push({ path: `/product/${id}` });
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
</style>

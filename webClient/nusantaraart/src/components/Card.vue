<template>
  <div
    class="card text-black mb-3"
    style="width: 300px;cursor:pointer;border-radius:5px;padding:15px;background-color:#FFFFFF"
    v-on:click="detail(product._id)"
  >
    <div
      style="padding:0px;border-radius:5px;height: 270px; width: 100%; display:flex;align-items:center;justify-content:center"
    >
      <img v-bind:src="product.images[0]" class="card-img-top" alt="..." />
    </div>

    <div class>
      <p style="color:black;text-align:center;font-weight:600">{{product.title}}</p>
      <li class="list-group-item" style="border-radius:5px;background-color:white;color:black">
        Category: {{ product.category }}
        <br />
        <small style="color:black">Creator: {{ product.userId.name }}</small><br>
      </li>
            <li class="list-group-item" style="border-radius:5px;background-color:white;color:black;margin-top:5px">

        <small style="color:black">Initial Price: {{ product.initialPrice }}</small>
      </li>
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

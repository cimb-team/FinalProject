<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a v-if="!islogin" class="navbar-brand" style="cursor:pointer;color:black">Nusantara Art</a>
    <router-link v-if="islogin" to="/products">
      <a
        class="navbar-brand"
        style="cursor:pointer;color:black"
      >Home</a>
    </router-link>

  <div v-if="islogin" class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">My Products <span class="sr-only">(current)</span></a>
      </li>
            <li class="nav-item active">
        <a class="nav-link" href="#">Profile <span class="sr-only">(current)</span></a>
      </li>

    </ul>
      <router-link to="/">
        <button
          class="btn btn-danger"
          style="border-radius: 20px"
          type="submit"
          v-on:click="logout"
        >Logout</button>
      </router-link>
  </div>
</nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'navbar',
  props: ['islogin'],
  components: {},
  methods: {
    logout () {
      this.$store.commit('USERLOGOUT')
      localStorage.clear()
    },
    ...mapActions(['FETCHQUESTIONS'])
  }
}
</script>
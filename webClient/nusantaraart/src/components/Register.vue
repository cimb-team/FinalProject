<template>
  <div id="register">
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="registerName">Name</label>
        <input
          v-model="register.name"
          type="text"
          class="form-control"
          id="registerName"
          placeholder="Enter name"
          required
        />
      </div>
      <div class="form-group">
        <label for="registerEmail">Email address</label>
        <input
          v-model="register.email"
          type="email"
          class="form-control"
          id="registerEmail"
          placeholder="Enter email"
          required
        />
      </div>
      <div class="form-group">
        <label for="registerPassword">Password</label>
        <input
          v-model="register.password"
          type="password"
          class="form-control"
          id="registerPassword"
          placeholder="Password"
          required
        />
      </div>
      <div class="form-group">
        <label for="registerPhone">Phone Number</label>
        <input
          v-model="register.phone"
          type="text"
          class="form-control"
          id="registerPhone"
          placeholder="Phone Number"
          required
        />
      </div>
      <button
        style="border-radius: 20px;width: 100px;text-align:center"
        type="submit"
        class="btn btn-primary"
      >
        Register
      </button>
      <p v-if="error.length != 0" style="color:red">{{ error }}</p>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: "",
        phone: ""
      },
      error: ""
    };
  },
  components: {},
  computed: {
    url() {
      return this.$store.state.url;
    }
  },
  methods: {
    registerUser() {
      axios({
        method: "POST",
        url: `${this.url}/user/signup`,
        data: {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password,
          phonenumber: this.register.phone
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.clearAll();
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    clearAll() {
      this.register.name = "";
      this.register.email = "";
      this.register.password = "";
      this.register.phone = "";
      this.error = "";
    }
  }
};
</script>

<style>
/* #login {
    display: flex;
    justify-content: center;
} */
</style>

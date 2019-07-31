<template>
  <div v-if="!islogin">
<div style=" display:flex;justify-content:center;margin-top:5%">
    <img src="	
https://storage.cloud.google.com/orvin-savero/merah.png" style="width:600px;height:250px"/>
</div>
    <div id="loginRegister" style="margin-bottom:200px;margin-top:5%">
      <div class="register">
        <h3 style="color:white">Register</h3>
        <Register></Register>
      </div>
      <div class="login">
        <h3 style="color:white">Login</h3>
        <Login></Login>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
export default {
  name: "login-register",
  props: ["islogin"],
  data() {
    return {};
  },
  components: {
    Login,
    Register
  },
  methods: {},
  created() {}
};
</script>

<style>
#loginRegister {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.register {
  margin-right: 100px;
}
.login {
  margin-left: 100px;
}
.header {
  text-align: center;
  margin-top: 50px;
  font-weight: 600;
}
</style>

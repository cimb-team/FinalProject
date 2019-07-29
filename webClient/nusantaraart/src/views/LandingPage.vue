<template>
<div v-if="!islogin">
  <h1 class="header">Nusantara Art</h1>
  <div id="loginRegister">
      <div class="register">
          <h3>Register</h3>
    <Register></Register>
    </div>
     <div class="login">
         <h3>Login</h3>
    <Login></Login>
      </div>
  </div>
  </div>
</template>
<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
export default {
  name: 'login-register',
  props: ['islogin'],
  data () {
    return {
    }
  },
  components: {
    Login,
    Register
  },
  methods: {},
  created () {}
}
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
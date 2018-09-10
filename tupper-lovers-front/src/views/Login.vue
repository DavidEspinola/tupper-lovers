<template>
  <div class="login">
    <form action="" @submit="login($event)">
      <label for="user">Usuario:</label>
      <input type="text" id="user" v-model="user">
      <label for="pass">Contraseña</label>
      <input type="password" id="pass" v-model="password">
      <input type="submit" value="Entrar">
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: '',
      password: ''
    }
  },
  components: {},
  methods: {
    async login(e) {
      e.preventDefault();
      try {
        await firebase.auth().signInWithEmailAndPassword(this.user, this.password);
        this.$router.push('/');
      } catch(error) {
        alert('Error al iniciar sesión');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .login {
    form {
      width: 300px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      margin: auto;
      margin-top: 20px;

      input[type=submit] {
        grid-column-start: 2;
      }
    }
  }
</style>

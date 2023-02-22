<template>
  <div class="login">
    <AuthHeader class="header"></AuthHeader>
    <div class="auth-main">
      <div class="login-container">
        <h2 class="auth-ttl">ログイン</h2>
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="ProviderProps" rules="required|email">
          <input class="auth-item" v-model="email" type="email" placeholder="メールアドレス" name="メールアドレス" required>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <validation-provider v-slot="ProviderProps" rules="required|min:6">
        <input class="auth-item" v-model="password" type="password" placeholder="パスワード" name="パスワード" required>
        <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <button class="btn" @click="login"
        :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button>
        </validation-observer>
        <br />
      </div>
      </div>
  </div>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth().signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          this.$router.push("/");
          alert('ログインしました')
          this.$store.dispatch('loginAction', uid)
        })
    }
  }
}
</script>
<style>
.error {
  font-size: large;
  margin: 10px 0;
}
.header {
  width: 100vw;
  height: 15vh;
}
.auth-main {
  width: 100vw;
  height: 85vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  width: 500px;
  height: 350px;
  background: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 10px;
}
.auth-ttl {
  font-size: 24px;
  margin-top: 20px;
}
.auth-item {
  width: 400px;
  height: 40px;
  border-radius: 10px;
  font-size: larger;
}
.btn {
  border-radius: 30px;
  background: rgb(90, 33, 248);
  border: none;
  width: 120px;
  height: 40px;
  color: white;
  cursor: pointer;
  font-size: large;
  margin-left: 140px;
}</style>
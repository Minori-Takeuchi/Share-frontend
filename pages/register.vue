<template>
  <div class="register">
    <AuthHeader class="header"></AuthHeader>
    <div class="auth-main">
      <div class="register-container">
        <h2 class="auth-ttl">新規登録</h2>
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="ProviderProps" rules="required|max:20">
          <input class="auth-item" v-model="name" type="name" name="ユーザーネーム" placeholder="ユーザーネーム" required >
          <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
        <validation-provider v-slot="ProviderProps" rules="required|email">
        <input class="auth-item" v-model="email" type="email" name="メールアドレス" placeholder="メールアドレス" required >
        <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <validation-provider v-slot="ProviderProps" rules="required|min:6">
        <input class="auth-item" v-model="password" type="password" name="パスワード" placeholder="パスワード" required >
        <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <button @click="register" class="btn"
        :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</button>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
    };
  },
  methods: {
    async register() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace("/");
            alert('ログインしました')
            const uid = data.user.uid
            this.$store.dispatch('loginAction', uid)

            const user = {
              name: this.name,
              id: uid,
            }
            this.$axios.post('/api/user/',user);
          })
        });
    },
  }
};
</script>
<style>
.register-container {
  width: 500px;
  height: 50vh;
  background: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 10px;
}
.btn {
  border-radius: 30px;
  background: rgb(90, 33, 248);
  border:none;
  width: 120px;
  height: 40px;
  color: white;
  display: block;
  cursor: pointer;
  margin-top: 25px;
  font-size: large;
}
</style>
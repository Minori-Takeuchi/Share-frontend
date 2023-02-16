<template>
  <div class="register">
    <AuthHeader class="header"></AuthHeader>
    <input v-model="name" type="name" placeholder="ユーザーネーム" required >
    <input v-model="email" type="email" placeholder="メールアドレス" required >
    <br />
    <input v-model="password" type="password" placeholder="パスワード" required >
    <br />
    <button @click="register">新規登録</button>
    <br />
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

            this.$axios.get('sanctum/csrf-cookie');

            const user = {
              name: this.name,
              id: uid,
            }
            this.$auth.loginWith('laravelSanctum', {
              withCredential: true,
              data: user,
            });

          })
        });
    },
  }
};
</script>
<style>
.header {
  width: 100vw;
  height: 10vh;
}
</style>
<template>
  <div class="login">
    <label>
      メールアドレス： <input v-model="email" type="email"/>
    </label>
    <br />
    <label>
      パスワード： <input v-model="password" type="password"/>
    </label>
    <br />
    <button @click="login">ログイン</button>
    <br />
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
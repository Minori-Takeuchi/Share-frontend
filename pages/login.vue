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
        const user = userCredential.user.uid;
        this.$router.replace("/");
        alert('ログインしました')

        this.$axios.get('sanctum/csrf-cookie');

        this.$store.dispatch('loginAction', user)
        
        this.$auth.loginWith('laravelSanctum', {
          withCredential: true,
          data: user
        });
      })
    }
  }
}
</script>
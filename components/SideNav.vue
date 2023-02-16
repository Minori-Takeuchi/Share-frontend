<template>
  <div class="side-nav">
    <div class="m-15">
      <img src="@/assets/img/logo.png" alt="ロゴ" class="header-logo">
      <div class="item flex">
        <img src="@/assets/img/home.png" alt="ホームへ戻る" class="item-img" @click="$router.push('/')">
        <nuxt-link to="/" class="txt">ホーム</nuxt-link>
      </div>
      <div class="item flex">
        <img src="@/assets/img/logout.png" alt="ログアウト" class="item-img">
        <a @click="logout" class="txt">ログアウト</a>
      </div>
      <br>
      <p class="txt">シェア</p>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <form @submit="postAdd">
          <validation-provider v-slot="ProviderProps" rules="required|max:120">
            <textarea v-model="newContent" name="コンテンツ"></textarea>
            <div class="error txt">{{ ProviderProps.errors[0] }}</div>
            <br>
          </validation-provider>
          <button @click="insertPost" class="btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">シェアする</button>
        </form>
      </validation-observer>
    </div>
  </div>
</template>
<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      newContent: '',
      postList: []
    };
  },
  methods: {
    async getPost() {
      const resData = await this.$axios.get("/api/post/");
      this.postList = resData.data.data
    },
    async insertPost() {
      const sendData = {
        user_id: this.$store.state.user,
        content: this.newContent,
      }
      await this.$axios.post("/api/post/", sendData);
      this.newContent = null
    },
    postAdd() {
      const sendData = {
        user_id: this.$store.state.user,
        content: this.newContent,
      }
      this.$emit('sendPost', sendData)
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトしました')
          this.$router.replace('/login')
        })
    },
  },
  async created() {
    await this.getPost()
  }
}
</script>

<style>
.side-nav {
  background: black;
  width: 100%;
  height: 100%;
  padding: auto;
}
.item {
  margin-top: 20px;
}
textarea {
  width: 90%;
  height: 200px;
  border-radius: 10px;
  border:2px solid white;
  background-color: black;
  color: white;
  font-size:20px;
  padding: 5px;
}
.btn {
  border-radius: 30px;
  background: rgb(90, 33, 248);
  width: 100px;
  height: 40px;
  color:white;
  margin: 15px auto;
  display: block;
}
</style>
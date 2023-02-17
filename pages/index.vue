<template>
  <div>
    <div class="container flex">
      <SideNav @sendPost="newPost" class="side"></SideNav>
      <div class="main">
        <div class="wrap-s">
          <p class="ttl m-15">ホーム</p>
        </div>
        <div class="wrap-m" v-for="(post, index) in posts" :key="index"
              >
          <Message
            :post="post"
            @sendDeletePost="deletePost"
            @sendLike="like"
            @sendUnLike="unlike"
            ></Message>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      postList: [],
    }
  },
  methods: {
    async getPost() {
      const resData = await this.$axios.get("/api/post/");
      this.postList = resData.data.data
      this.posts = this.postList.filter((e) =>
        e.user_id === this.$store.state.user);
    },
    
    // 投稿の追加
    newPost(sendData) {
      this.postList.push(sendData);
    },
    // 投稿の削除
    async deletePost(sendData) {
      this.postList.splice(sendData);
      await this.$axios.delete("/api/post/" + sendData.post.id)
      this.getPost();
    },
    async like() {
      await this.$axios.create("/api/like/")
      this.postList.push(sendData);
      this.getPost();
      console.log(sendData)
    },
    async unLike(sendData) {
      this.postList.splice(sendData);
      await this.$axios.delete("/api/like/" + sendData)
      this.getPost();
    },
  },
  async created() {
    await this.getPost()
},
}
</script>
<style>
.container {
  width: 100vw;
  background: black;
}

.main {
  width: 80vw;
}

.flex {
  display: flex;
}

.side {
  width: 20vw;
  position: sticky;
  top: 0;
}

.txt {
  text-decoration: none;
  color: white;
  display: inline-block;
  align-items: center;
  margin: 10px;
}

.m-15 {
  margin: 15px;
  height: 100%;
}

.wrap-s {
  width: 100%;
  border: 3px solid white;
}

.ttl {
  color: white;
  display: inline-block;
  align-items: center;
  padding-left: 20px;
}

.item-img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.btn {
  cursor: pointer;
}

.pointer {
  cursor: pointer;
}
</style>
<template>
  <div>
    <div class="container flex">
      <SideNav @sendPost="newPost" class="side"></SideNav>
      <div class="main">
        <div class="wrap-s">
          <p class="ttl m-15">ホーム</p>

        </div>
        <div class="wrap-m" v-for="(post, index) in posts" :key="index">
          <Message
            :post="post"
            @sendDeletePost="deletePost"
            @sendLike="like"
            @sendUnLike="unLike"
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
      const postsData = await this.$axios.get("/api/post/");
      this.postList = postsData.data.data.map((posts) => {
        return {
          id: posts.id,
          content: posts.content,
          user_id: posts.user_id,
          user_name: posts.user.name,
          likesLength: posts.likes.length,
          likes: posts.likes
        }
      })
      this.posts = this.postList.filter((e) =>
        e.user_id === this.$store.state.user);
    },
    // 投稿の追加
    newPost(sendData) {
      this.postList.push(sendData)
      alert("投稿しました")
    },
    // 投稿の削除
    async deletePost(sendData) {
      await this.$axios.delete("/api/post/" + sendData.post.id)
      const index = this.posts.findIndex(({ id }) => id == sendData.post.id)
        alert("投稿を削除しました")
        console.log(index)
      this.posts.splice(index)
      this.getPost();
    },
    // いいね作成
    async like(sendData) {
      const index = this.posts.findIndex(({ id }) => id == sendData.post_id)
      console.log(index)
      await this.$axios.post("/api/like/", sendData)
      this.posts[index].likes.push(sendData);
      this.getPost();
      console.log(this.posts[index])
      alert("いいねしました")
    },
    // いいね削除
    async unLike(sendData) {
      await this.$axios.delete("/api/like/" + sendData.id)
      const index = this.posts.findIndex(({ id }) => id == sendData.post_id)
      this.posts[index].likes.splice(sendData);
      alert("いいねを取り消しました")
      this.getPost();
    },
  },
  async created() {
    await this.getPost()
  }
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

.pointer {
  cursor: pointer;
}

.btn {
  border-radius: 30px;
  background: rgb(90, 33, 248);
  width: 100px;
  height: 40px;
  color:white;
  display: block;
  cursor: pointer;
}
</style>
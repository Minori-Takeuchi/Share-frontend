<template>
  <div>
    <div class="container flex">
      <SideNav class="side"></SideNav>
      <div class="main">
        <div class="wrap-s">
          <p class="ttl m-15">コメント</p>
        </div>
        <div class="wrap-m">
          <Message
            :post="post"
            @sendDeletePost="deletePost"
            @sendLike="like"
            @sendUnLike="unLike">
          </Message>
        </div>
        <div class="wrap-s--sub">
          <p class="m-15 sub-ttl">コメント</p>
        </div>
        <table v-for="(comment, index) in comments" :key="index"
            class="wrap-m">
          <tr>
            <td class="txt bolder">{{ comment.user_name }}</td>
          </tr>
          <tr>
            <td class="txt">{{ comment.comment }}</td>
          </tr>
        </table>
        <input v-model="newComment" name="コメント" class="comment">
        <br>
          <div class="flex comment-btn">
            <button @click="insertComment" class="btn">コメント</button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      post: {},
      comments: [],
      newComment: '',
    }
  },
  methods: {
    async fetchPost() {
      const resPostData = await this.$axios.get(`/api/post/${this.$route.params.id}`);
      const postData = {
        id: resPostData.data.data[0].id,
        content: resPostData.data.data[0].content,
        user_id: resPostData.data.data[0].user.id,
        user_name: resPostData.data.data[0].user.name,
        likesLength: resPostData.data.data[0].likes.length,
        likes: resPostData.data.data[0].likes
      }
      this.post = postData
    },
    async getComment() {
      const resCommentsData = await this.$axios.get("/api/comment/");
      const commentsData = resCommentsData.data.data.map((comments) => {
        return {
          id: comments.id,
          comment: comments.comment,
          post_id: comments.post_id,
          user_id: comments.user_id,
          user_name: comments.user.name,
        }
      })
      this.comments = commentsData.filter((e) =>
        e.post_id === this.post.id);
    },
    // 投稿の削除
    async deletePost(sendData) {
      await this.$axios.delete("/api/post/" + sendData.post.id)
      alert("投稿を削除しました")
      this.$router.push("/")
    },
    // いいね作成
    async like(sendData) {
      await this.$axios.post("/api/like/", sendData)
      this.post.likes.push(sendData);
      this.fetchPost();
      alert("いいねしました")
    },
    // いいね削除
    async unLike(sendData) {
      await this.$axios.delete("/api/like/" + sendData.id)
      const index = this.post.likes.findIndex(({ id }) => id == sendData.id)
      this.post.likes.splice(sendData);
      alert("いいねを取り消しました")
      this.fetchPost();
    },
    // コメント作成
    async insertComment() {
      const sendData = {
        user_id: this.$store.state.user,
        post_id: this.post.id,
        comment: this.newComment,
      }
      console.log(sendData)
      await this.$axios.post("/api/comment/", sendData);
      this.newComment = null
      this.getComment()
    }
  },
  async created() {
    await this.fetchPost()
    await this.getComment()
  }
}

</script>
<style>
.wrap-s--sub {
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
}
.sub-ttl {
  color: white;
  display: inline-block;
  align-items: center;
}

.comment {
  width: 90%;
  border-radius: 10px;
  border:2px solid white;
  background-color: black;
  color: white;
  font-size:20px;
  padding: 5px;
  margin: 20px auto;
  display: block;
}

.comment-btn {
  justify-content:flex-end;
  margin: 0 100px;
}

</style>
<template>
  <div class="post wrap-m">
    <div class="post-item flex">
      <p class="post-user txt">{{ post.user.name }}</p>
      <!-- いいねをしているとき -->
      <img
        v-if="post.like.user_id === post.id"
        @click="unLike"
        src="~/assets/img/heart.png"
        alt="いいね" class="item-img">
      <!-- いいねをしていないとき -->
      <img
        v-if="post.like.user_id === post.id"
        @click="Like"
        src="~/assets/img/heart.png"
        alt="いいね" class="item-img">
      <p class="txt"></p>
      <img src="~/assets/img/cross.png" alt="削除" @click="deletePost" class="item-img">
      <img v-show="$route.name === 'index'" src="~/assets/img/detail.png" alt="コメントへ" class="item-img" @click="goPostDetail">
    </div>
    <br>
    <div class="post-content txt">{{ post.content }}</div>
    <div class="post-content txt">{{ post.id}}</div>
  </div>
  </template>
<script>




export default {
  props: {
    post: {
      type: Object,
    },
  },
  methods: {
    // 投稿削除
    deletePost() {
      const sendData = {
        post: this.post,
      }
      this.$emit('sendDeletePost', sendData)
    },
    // コメントページへ
    goPostDetail() {
      this.$router.push({ path: `/posts/${this.post.id}` });
    },

    // いいねをしていないときの処理（いいね作成）
    // async like() {
    //   const sendData = {
    //     user_id: this.$store.state.user,
    //     post_id: this.post.id
    //   }
    //   await this.$axios.create("/api/like/")
    //   this.getPost();
    //   this.$emit('sendLike', sendData)
    // }
  },
}
</script>
<style>
.post {
  width: 100%;
  height: 100px;
}
.wrap-m {
  width: 100%;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
}
.post-item {
  padding-top: 15px;
}
.post-content {
  display: inline;
  padding-bottom: 20px;
}
.post-item .item-img:last-child {
  margin-left: 50px;
}
</style>
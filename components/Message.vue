<template>
  <div class="post wrap-m">
    <div class="post-item flex">
      <p class="post-user txt">{{ post.user.name }}</p>
      <!-- いいねをしているとき -->
      <img
        @click="isLiked"
        src="~/assets/img/heart.png"
        alt="いいね" class="item-img">
      <p class="txt">{{  }}</p>
      <img src="~/assets/img/cross.png" alt="削除" @click="deletePost" class="item-img">
      <img v-show="$route.name === 'index'" src="~/assets/img/detail.png" alt="コメントへ" class="item-img" @click="goPostDetail">
    </div>
    <br>
    <div class="post-content txt">{{ post.content }}</div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
    },
    fetchPost: {
      type: Object,
    },
  },
  data() {

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
      this.$router.push({ path: `/posts/${this.post.id}`});
    },
    isLiked() {
      if (this.post.id === this.post.likes.post_id && this.post.user.id === this.$store.state.user) {
        this.unLike();
      } else {
        this.like();
      }
    },
    // いいねをしていないときの処理（いいね作成）
    like() {
      const sendData = {
        user_id: this.$store.state.user,
        post_id: this.post.id
      }
      this.$emit('sendLike', sendData)
    },
    unLike() {
      const sendData = {
        id: this.post.likes.id
      }
      this.$emit('sendUnLike', sendData)
    },
  }
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
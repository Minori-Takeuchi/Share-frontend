<template>
  <div class="post wrap-m">
    <div class="post-item flex">
      <p class="bolder txt">{{ post.user_name }}</p>
      <!-- いいねをしているとき -->
      <img
        @click="checkLike"
        src="~/assets/img/heart.png"
        alt="いいね" class="item-img">
      <p class="txt">{{ post.likesLength }}</p>
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
    post: {},
  },
  data() {
    isLiked :''
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
    //いいね判定
    checkLike() {
      const isLiked = this.post.likes.find((e) => {
          return e.user_id === this.$store.state.user
      })
      if (!isLiked) {
        this.like()
      } else {
        this.unLike(isLiked)
        }
    },
    // いいねをしていないときの処理（いいね作成）
    like() {
      const sendData = {
        post_id: this.post.id,
        user_id: this.$store.state.user
      }
      this.$emit('sendLike', sendData)
    },
    // いいねをしているときの処理（いいね削除）
    async unLike(value) {
      const sendData = {
        id: value.id,
        post_id: value.post_id
      }
      this.$emit('sendUnLike', sendData)
    },
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
.bolder {
  font-weight: bolder;
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